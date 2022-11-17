import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { identifyPhoneSchema } from "../../schema/form_validation";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material/";

import axios from "axios";

import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PacmanLoader from "react-spinners/PacmanLoader";

const API_URL = `${process.env.REACT_APP_API_URL}/api/password/email/phone`;

export default function IdentifyPhone() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(identifyPhoneSchema),
  });

  const [loading, setLoading] = useState(false);

  const { state } = useLocation();
  const onSubmit = (data) => {
    phoneDataMutation.mutate(data.phone);
    setLoading(true);
  };

  const phoneDataMutation = useMutation(
    async (phone) => {
      const data = { email: state.email, phone: phone };

      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);

      return res.data;
    },
    {
      onSuccess: (e) => {
        setLoading(false);
        setTimeout(
          () =>
            toast.success("이메일로 인증링크가 전송 되었습니다!", {
              position: toast.POSITION.TOP_CENTER,
            }),
          50
        );
      },
      onError: (error) => {
        setLoading(false);
        setTimeout(
          () =>
            toast.warn(
              "서버와 연결이 문제가 있거나 등록되지 않은 전화번호 입니다!",
              {
                position: toast.POSITION.TOP_CENTER,
              }
            ),
          50
        );
      },
    }
  );

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
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ToastContainer pauseOnHover={false} />
      <Typography component="h1" variant="h5">
        비밀번호 찾기 (전화번호 인증)
      </Typography>
      <Typography component="h6" variant="h6">
        비밀번호는 이메일과 전화번호를 통해 찾을 수 있습니다
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                id="email"
                name="email"
                label="이메일(아이디)"
                value={state.email}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                id="phone"
                name="phone"
                label="전화번호"
                error={!!errors.phone}
                {...register("phone")}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
            size="large"
          >
            비밀번호 찾기
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
