import { useLocation, useNavigate } from "react-router-dom";
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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function RecoverInitiate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const uuid = query.get("id");

  const navigate = useNavigate();

  const sendToServer = async (data) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/password/email/phone/sending?id=${uuid}`,
        data,
        { withCredentials: true }
      );

      toast.success("비밀번호 재설정이 성공적으로 처리됐습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.warn("비밀번호 재설정이 실패했습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    const passwordData = {
      newPassword: data.pw,
      confirmNewPassword: data.passwordConfirm,
    };

    sendToServer(passwordData);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <ToastContainer pauseOnHover={false} />
      <Typography component="h1" variant="h5">
        비밀번호 재설정
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
            변경
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
