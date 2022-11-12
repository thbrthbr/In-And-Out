import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material/";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PasswordChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  const handlePasswordChange = async (passwordData) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/member/password`,
        {
          password: passwordData.password,
          newPassword: passwordData.newPassword,
        },
        { withCredentials: true }
      );

      toast.success("비밀번호 변경이 성공적으로 처리됐습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      toast.warn("비밀번호 변경이 성공적으로 처리되지 않았습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const onSubmit = async (e) => {
    const obj = {};

    obj.password = e.oldPw;
    obj.newPassword = e.passwordConfirm;

    handlePasswordChange(obj);
  };

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
        비밀번호 변경
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
                required
                autoFocus
                fullWidth
                type="password"
                id="oldpassword"
                name="oldpassword"
                label="이전 비밀번호"
                error={!!errors.oldPw}
                {...register("oldPw")}
                helperText={errors.oldPw?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                label="새 비밀번호"
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
                label="새 비밀번호 확인"
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
            제출
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
