import React, { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileChangeSchema } from "../../schema/form_validation";

import styled from "styled-components";
import defaultUser from "../../img/default-user.jpg";
import { useStore, loginStore } from "../../store/store.js";
import DaumPostcode from "react-daum-postcode";

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
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PacmanLoader from "react-spinners/PacmanLoader";

const handleImgError = (e) => {
  e.target.src = defaultUser;
};

export default function ProfileChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileChangeSchema),
  });

  const { profileImage, setProfileImage } = useStore();
  const {
    id,
    nickname,
    setNickname,
    phoneNumber,
    setPhoneNumber,
    birthdate,
    setBirthdate,
    residence,
    setResidence,
    gender,
    setGender,
  } = loginStore();

  const fileInput = useRef();
  const [openPostcode, setOpenPostcode] = useState(false);
  const queryClient = useQueryClient();
  const [imageDelete, setImageDelete] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTimeout(() => setProfileImage(reader.result), 1000);
    };
  };

  const onNameHandler = (event) => {
    setNickname(event.currentTarget.value);
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

  const onSubmit = async (e) => {
    saveDataMutation.mutate(e);
  };

  const handlePostButtonClick = () => {
    setOpenPostcode(!openPostcode);
  };

  const handleAddressSelect = (data) => {
    setResidence(data.address);
    setOpenPostcode(false);
  };

  const getUserData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/member/info`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return res.data;
  };

  const { isLoading } = useQuery(
    ["getProfileData"],
    getUserData,
    {
      onSuccess: (data) => {
        console.log(data);
        setNickname(data["nickName"]);
        setPhoneNumber(data["phone"]);
        setBirthdate(data["birth"]);
        setResidence(data["address"]);

        setGender(data["gender"]);
        setProfileImage(data["s3ImageUrl"] ? data["s3ImageUrl"] : defaultUser);
      },
      onError: () => {},
    },
    { staleTime: 10000, refetchOnWindowFocus: false }
  );

  const saveDataMutation = useMutation(
    async (userData) => {
      let file = fileInput.current.files[0];
      console.log(file);
      console.log(defaultUser);
      if (!file || file === defaultUser)
        file = new File([110, 117, 108, 108], "null");

      if (imageDelete) {
        file = new File([100, 101, 108, 101, 116, 101], "delete");
        setImageDelete(false);
      }
      console.log(profileImage);
      userData = {
        ...userData,
        address: userData.residence,
        nickName: userData.name,
        birth: userData.birthday,
      };
      delete userData.residence;
      delete userData.birthday;
      delete userData.name;
      console.log(
        "data",
        userData,
        file
        // new File([110, 117, 108, 108], "null")
      );
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "input",
        new Blob([JSON.stringify(userData)], { type: "application/json" })
      );

      // FormData의 key 확인
      for (let key of formData.keys()) {
        console.log(key);
      }

      // FormData의 value 확인
      for (let value of formData.values()) {
        console.log(value);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/member/info`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      return res.data;
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("프로필 변경이 성공적으로 처리됐습니다!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setProfileImage(null);
        queryClient.invalidateQueries("getProfileData");
      },
      onError: (data, variables, context) => {
        toast.warn("프로필 변경이 성공적으로 처리되지 않았습니다.", {
          position: toast.POSITION.TOP_CENTER,
        });
      },
    }
  );

  if (isLoading)
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
        프로필 변경
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, ml: 5, display: "flex", justifyContent: "center" }}
      >
        <Photo>
          <img
            alt="프로필사진"
            src={profileImage ? profileImage : defaultUser}
            onError={handleImgError}
            style={{
              width: "200px",
              height: "180px",
            }}
          />
          <FileImage onClick={handleButtonClick} htmlFor="input-file">
            이미지 업로드
          </FileImage>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setProfileImage(null);
              setImageDelete(true);
            }}
          >
            이미지 삭제
          </button>
        </Photo>
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                type="text"
                id="email"
                name="email"
                label="이메일"
                defaultValue={id}
                inputProps={{ readOnly: true }}
                error={!!errors.email}
                {...register("email")}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                type="text"
                id="name"
                name="name"
                label="닉네임"
                error={!!errors.name}
                defaultValue={nickname}
                {...register("name", { onChange: onNameHandler })}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                type="text"
                id="phone"
                name="phone"
                label="전화번호"
                error={!!errors.phone}
                defaultValue={phoneNumber}
                {...register("phone", { onChange: onPhoneNumberHandler })}
                helperText={errors.phone?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                type="text"
                id="birthday"
                name="birthday"
                label="생년월일"
                error={!!errors.birthday}
                defaultValue={birthdate}
                {...register("birthday", { onChange: onBirthdateHandler })}
                helperText={errors.birthday?.message}
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                type="text"
                id="residence"
                name="residence"
                label="거주지"
                error={!!errors.residence}
                value={residence}
                defaultValue={residence}
                {...register("residence", {
                  onChange: (e) => {
                    setResidence(e.target.value);
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
                  defaultChecked={gender === "female" ? true : false}
                  checked={gender === "female" ? true : false}
                  {...register("gender", { onChange: onGenderHandler })}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="남자"
                  defaultChecked={gender === "male" ? true : false}
                  checked={gender === "male" ? true : false}
                  {...register("gender", { onChange: onGenderHandler })}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
              </RadioGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "58%" }}
            size="large"
          >
            제출
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}

const FileImage = styled.button`
  font-size: 15px;
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:active {
    background-color: pink;
  }
`;

const Photo = styled.div`
  margin: 120px;
  display: flex;
  flex-direction: column;
`;
