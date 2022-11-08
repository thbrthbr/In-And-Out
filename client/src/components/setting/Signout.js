import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";
import { loginStore, useStore2 } from "../../store/store.js";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material/";

export default function Signout() {
  const navigate = useNavigate();
  const {
    id,
    setId,
    setPassword,
    setNickname,
    setPhoneNumber,
    setBirthdate,
    setResidence,
    setGender,
  } = loginStore();

  const { setLogState } = useStore2();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  async function signout() {
    await fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    });

    alert("회원 탈퇴 완료");
  }

  const sendToServer = async (data) => {
    console.log(data);
    try {
      const res = await axios.delete(
        "${process.env.REACT_APP_API_URL}/api/member/info",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(
        "회원탈퇴가 성공적으로 처리됐습니다! 3초후에 메인페이지로 이동합니다",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );

      setTimeout(() => {
        sessionStorage.clear();
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.warn("회원탈퇴 처리에 실패했습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const onSubmit = (data) => {
    const passwordData = {
      password: data.passwordConfirm,
    };

    sendToServer(passwordData);
  };
  // const onSubmit = async (e) => {
  //   const response = await fetch(`http://localhost:4000/users`);
  //   if (response.ok) {
  //     const users = await response.json();
  //     const user = users.find((user) => user.id === id);
  //     if (user.password !== e["pw"]) {
  //       alert("비밀번호가 맞지 않습니다.");
  //       throw new Error("비밀번호가 맞지 않습니다.");
  //     }
  //   } else {
  //     throw new Error("서버 통신이 원할하지 않습니다.");
  //   }
  //   await signout();
  //   setLogState(false);
  //   setId("");
  //   setNickname("");
  //   setPhoneNumber("");
  //   setBirthdate("");
  //   setResidence("");
  //   setGender("");
  //   setPassword("");

  //   sessionStorage.clear();
  //   navigate("/");
  // };

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
        회원 탈퇴
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      >
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2}>
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
            <Grid item xs={12}>
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
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
            size="large"
          >
            탈퇴
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
