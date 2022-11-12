import React, { useRef, useState, useEffect } from "react";

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
    password,
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
  const [address, setAddress] = useState("");
  const queryClient = useQueryClient();

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
      // console.log(reader.result);
      // ImagePut(reader.result);
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

  // async function ImagePut(e) {
  //   const response = await fetch(`http://localhost:4000/users/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       password: password,
  //       nickname: nickname,
  //       phoneNumber: phoneNumber,
  //       birthdate: birthdate,
  //       residence: residence,
  //       gender: gender,
  //       profileImage: e == null ? profileImage : e,
  //     }),
  //   });

  //   // console.log(response);

  //   if (response.ok) {
  //     alert("수정완료");
  //   } else {
  //     alert("오류");
  //   }
  // }

  // async function put(e) {
  //   console.log(e);
  //   const response = await fetch(`http://localhost:4000/users/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       password: password,
  //       nickname: e["name"],
  //       phoneNumber: e["phone"],
  //       birthdate: e["birthday"],
  //       residence: e["residence"],
  //       gender: e["gender"],
  //       profileImage: profileImage,
  //     }),
  //   });

  //   console.log(response);

  //   if (response.ok) {
  //     setNickname(e["name"]);
  //     setPhoneNumber(e["phone"]);
  //     setBirthdate(e["birthday"]);
  //     setResidence(e["residence"]);
  //     setGender(e["gender"] === "남" ? "male" : "female");
  //     alert("수정완료");
  //   } else {
  //     alert("오류");
  //   }
  // }

  const onSubmit = async (e) => {
    // put(e);
    // password,
    // console.log(e["name"]);
    // console.log(e["phone"]);
    // console.log(e["birthday"]);
    // console.log(e["residence"]);
    // console.log(e["gender"]);
    // console.log(profileImage);
    // e.address = e.residence;
    // e.birth = e.birthday;
    // e.nickname = e.name;
    // e.memberPhotoUrl = "";
    // delete e.email;
    // delete e.residence;
    // delete e.birthday;
    // delete e.name;
    // console.log("d", e);
    saveDataMutation.mutate(e);
  };

  const handlePostButtonClick = () => {
    setOpenPostcode(!openPostcode);
  };

  const handleAddressSelect = (data) => {
    // console.log(data.address);
    setAddress(data.address);
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

  const { data, isLoading } = useQuery(["getProfileData"], getUserData, {
    onSuccess: (data) => {
      console.log(data);
      // setNickname(data["nickName"]);
      setPhoneNumber(data["phone"]);
      setBirthdate(data["birth"]);
      // setResidence(data["address"]);
      setAddress(data["address"]);
      setGender(data["gender"] === "남" ? "male" : "female");
      setProfileImage(data["s3ImageUrl"]);
    },
    onError: (data) => {
      // toast.warn("회원 정보를 가져오는데 실패하였습니다.", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    },
  });

  const saveDataMutation = useMutation(
    async (userData) => {
      const file =
        fileInput.current.files[0] === undefined
          ? fileInput.current.files[0]
          : fileInput.current.files[0];
      userData = {
        ...userData,
        address: userData.residence,
        nickName: userData.name,
        birth: userData.birthday,
      };
      delete userData.residence;
      delete userData.birthday;
      delete userData.name;
      console.log("data", userData, file, new Blob([file]));
      const formData = new FormData();
      formData.append("file", new Blob([file]));
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

      const res = await axios.put("/api/member/info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return res.data;
    },
    {
      onSuccess: (data, variables, context) => {
        toast.success("프로필 변경이 성공적으로 처리됐습니다!", {
          position: toast.POSITION.TOP_CENTER,
        });
        queryClient.invalidateQueries("getProfileData");
      },
      onError: (data, variables, context) => {
        toast.warn("프로필 변경이 성공적으로 처리되지 않았습니다.", {
          position: toast.POSITION.TOP_CENTER,
        });
      },
    }
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
      <ToastContainer />
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
            style={{ width: "200px", height: "180px" }}
          />
          <File onClick={handleButtonClick} htmlFor="input-file">
            이미지 업로드
          </File>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <button onClick={() => setProfileImage("")}>이미지 삭제</button>
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
                value={address}
                defaultValue={residence}
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

const File = styled.button`
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
