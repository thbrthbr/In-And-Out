import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/form_validation";

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
  useStore2,
  useStore3,
  loginStore,
  backUpStore,
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
    // e.preventDefault();
    // const result = await tempFunc(e["email"], e["pw"]);
    // console.log(result);
    // if (result) {
    //   setId(e["email"]);
    //   setPassword(e["pw"]);
    //   setNickname(result.nickname);
    //   setBU_Nickname(result.nickname);
    //   setPhoneNumber(result.phoneNumber);
    //   setBirthdate(result.birthdate);
    //   setResidence(result.residence);
    //   setGender(result.gender);
    //   setLogState(true);
    // }
    try {
      const res = await axios.post("/api/signin", {
        email: e["email"],
        password: e["pw"],
      });
      // console.log(res);

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

  function loginHandler() {
    setLogState(true);
    console.log(localStorage.getItem("login-stuff"));
  }
  function logoutHandler() {
    setLogState(false);
    sessionStorage.clear();
    setId("");
    setNickname("");
    setPhoneNumber("");
    setBirthdate("");
    setResidence("");
    setGender("");
    console.log(id);
  }

  const test = async () => {
    const res = await axios.post("/api/signin", {
      email: "yellowghost@hanmail.com",
      password: "yel123!@",
    });
    console.log(res);
  };
  // test();

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
            <ToastContainer />
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
        </>
      )}

      <div>로그인 상태 : {logState ? "로그인됨" : "로그아웃됨"}</div>
    </div>
  );
}
