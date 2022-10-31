import React, { useRef } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileChangeSchema } from "../../schema/form_validation";

import styled from "styled-components";
import defaultUser from "../../img/default-user.jpg";
import { useStore, loginStore } from "../../store/store.js";

import { Button, TextField, FormControl, Grid, Box } from "@mui/material/";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = async () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
      console.log(reader.result);
      ImagePut(reader.result);
    };
  };

  async function ImagePut(e) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        nickname: nickname,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        residence: residence,
        gender: gender,
        profileImage: e == null ? profileImage : e,
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("수정완료");
    } else {
      alert("오류");
    }
  }

  async function put(e) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        nickname: e["name"],
        phoneNumber: e["phone"],
        birthdate: e["birthday"],
        residence: e["residence"],
        gender: e["gender"],
        profileImage: profileImage,
      }),
    });

    console.log(response);

    if (response.ok) {
      setNickname(e["name"]);
      setPhoneNumber(e["phone"]);
      setBirthdate(e["birthday"]);
      setResidence(e["residence"]);
      setGender(e["gender"]);
      alert("수정완료");
    } else {
      alert("오류");
    }
  }

  const onSubmit = async (e) => {
    put(e);
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 20, ml: 25, display: "flex", justifyContent: "center" }}
      >
        <Photo>
          <img
            alt="프로필사진"
            src={profileImage ? profileImage : defaultUser}
            style={{ width: "200px" }}
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
                error={!!errors.oldPw}
                {...register("oldPw")}
                helperText={errors.oldPw?.message}
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
                {...register("name")}
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
                {...register("phone")}
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
                {...register("birthday")}
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
                defaultValue={residence}
                {...register("residence")}
                helperText={errors.residence?.message}
              />
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
                  {...register("gender")}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
                <FormControlLabel
                  value="남자"
                  control={<Radio />}
                  label="남자"
                  defaultChecked={gender === "male" ? true : false}
                  {...register("gender")}
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
    </>
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
