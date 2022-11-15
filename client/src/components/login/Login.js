import { useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/form_validation";
import naverLogin from "../../img/naverLogin.png";
import googleLogin from "../../img/googleLogin.png";

import axios from "axios";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material/";

import {
  useStore,
  useStore2,
  useStore3,
  loginStore,
} from "../../store/store.js";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { profileImage, setProfileImage } = useStore();
  const { logState, setLogState } = useStore2();
  const { tempFunc } = useStore3();
  const {
    id,
    setId,
    setPassword,
    nickname,
    setNickname,
    setPhoneNumber,
    setBirthdate,
    setResidence,
    setGender,
  } = loginStore();

  const onSubmit = async (e) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/signin`,
        {
          email: e["email"],
          password: e["pw"],
        },
        {
          withCredentials: true,
        }
      );

      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/member/info`,
        {
          withCredentials: true,
        }
      );

      res.data["s3ImageUrl"] && setProfileImage(res.data["s3ImageUrl"]);

      setLogState(true);
      setTimeout(() => {
        setId(e["email"]);
        navigate("/calendar");
      }, 0);
    } catch (err) {
      console.log(err);
      toast.warn("서버와 연결이 문제가 있거나 로그인 정보가 틀렸습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {logState ? (
        <div> Logged in : {nickname} </div>
      ) : (
        <>
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
              in&out에 로그인
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                mt: 3,
              }}
            >
              <FormControl component="fieldset" variant="standard">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      autoFocus
                      fullWidth
                      type="text"
                      id="email"
                      name="email"
                      label="아이디 (이메일)"
                      error={!!errors.email}
                      {...register("email")}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호"
                      error={!!errors.pw}
                      {...register("pw")}
                      helperText={errors.pw?.message}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "100%" }}
                  size="large"
                >
                  로그인
                </Button>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "20%", backgroundColor: "lightgreen" }}
              size="large"
              onClick={() => navigate("/signin")}
            >
              회원가입
            </Button>
            <Button
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={() => navigate("/identify_email")}
            >
              비밀번호 찾기
            </Button>
          </Box>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",

              justifyContent: "center",
            }}
          >
            <Button
              sx={{
                mr: 5,
                width: "10%",
              }}
              size="large"
              href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`}
              target="_self"
              rel="noopener noreferrer"
            >
              <img
                width="280px"
                height="49px"
                alt="google"
                src={googleLogin}
              ></img>
            </Button>
            <Button
              sx={{
                width: "10%",
              }}
              size="large"
              href={`${process.env.REACT_APP_API_URL}/oauth2/authorization/naver`}
              target="_self"
              rel="noopener noreferrer"
            >
              <img
                width="280px"
                height="49px"
                alt="naver"
                src={naverLogin}
              ></img>
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}
