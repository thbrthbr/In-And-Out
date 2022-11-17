import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../schema/form_validation";

import { loginStore } from "../../store/store.js";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material/";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Signin() {
  const {
    id,
    password,
    phoneNumber,
    nickname,
    birthdate,
    residence,
    gender,
    setId,
    setPassword,
    setNickname,
    setPhoneNumber,
    setBirthdate,
    setResidence,
    setGender,
  } = loginStore();

  const navigate = useNavigate();
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handlePostButtonClick = () => {
    setOpenPostcode(!openPostcode);
  };

  const handleAddressSelect = (data) => {
    setAddress(data.address);
    setOpenPostcode(false);
  };

  async function sendUserDataToServer() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/signup`,

        {
          email: id,
          password: password,
          nickName: nickname,
          phone: phoneNumber,
          birth: birthdate,
          address: residence,
          gender: gender,
        },
        { withCredentials: true }
      );

      console.log(response);

      setLoading(false);
      setTimeout(() => {
        toast.success("회원가입 성공! 이메일로 인증 해주세요", {
          position: toast.POSITION.TOP_CENTER,
        });
      }, 50);

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setTimeout(() => {
        toast.warn(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }, 50);

      console.log(error);
      setLoading(false);
    }
  }

  const onSubmit = (data) => {
    sendUserDataToServer();
    setLoading(true);
  };

  const onEmailHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };
  const onBirthdateHandler = (event) => {
    setBirthdate(event.currentTarget.value);
  };
  const onResidenceHandler = (event) => {
    setResidence(event.currentTarget.value);
  };
  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value);
  };

  if (loading)
    return (
      <PacmanLoader
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        color="#36d7b7"
        size={50}
      />
    );

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ToastContainer pauseOnHover={false} />
      <Typography component="h1" variant="h5">
        in & out 회원가입
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3,
          ml: 5,
        }}
      >
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                required
                type="text"
                id="email"
                name="email"
                label="아이디(이메일)"
                error={!!errors.email}
                {...register("email", { onChange: onEmailHandler })}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                label="비밀번호"
                error={!!errors.pw}
                {...register("pw", { onChange: onPasswordHandler })}
                helperText={errors.pw?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                required
                fullWidth
                type="password"
                id="rePassword"
                name="rePassword"
                label="비밀번호 확인"
                error={!!errors.passwordConfirm}
                {...register("passwordConfirm")}
                helperText={errors.passwordConfirm?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                required
                type="text"
                id="name"
                name="name"
                label="닉네임"
                error={!!errors.name}
                {...register("name", { onChange: onNameHandler })}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                required
                type="text"
                id="phone"
                name="phone"
                label="전화번호"
                error={!!errors.phone}
                {...register("phone", { onChange: onPhoneNumberHandler })}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                required
                type="text"
                id="birthday"
                name="birthday"
                label="생년월일(ex.2011-01-01)"
                error={!!errors.birthday}
                {...register("birthday", { onChange: onBirthdateHandler })}
                helperText={errors.birthday?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                required
                type="text"
                id="residence"
                name="residence"
                value={address}
                label="거주지"
                error={!!errors.residence}
                defaultValue={address}
                {...register("residence", {
                  onChange: (e) => {
                    setAddress(e.target.value);
                    onResidenceHandler(e);
                  },
                })}
                helperText={errors.residence?.message}
              />
              <Button onClick={handlePostButtonClick}>주소 검색</Button>
              {openPostcode && (
                <DaumPostcode
                  style={{ height: "130px" }}
                  onComplete={handleAddressSelect} // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery="판교역로 235"
                />
              )}
            </Grid>
            <Grid item xs={7}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="여자"
                  required
                  checked={gender === "female" ? true : false}
                  {...register("gender", { onChange: onGenderHandler })}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="남자"
                  checked={gender === "male" ? true : false}
                  {...register("gender", { onChange: onGenderHandler })}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={7}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "100%" }}
                size="large"
              >
                제출
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Box>
    </Box>
  );
}
