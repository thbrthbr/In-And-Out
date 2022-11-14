import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { identifyEmailSchema } from "../../schema/form_validation";

import axios from "axios";

import { useMutation } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
} from "@mui/material/";

const API_URL = `${process.env.REACT_APP_API_URL}/api/password/email`;

export default function IdentifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(identifyEmailSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    emailDataMutation.mutate(data.email);
  };

  const emailDataMutation = useMutation(
    async (email) => {
      const data = { email: email };

      const res = await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res);
      return res.data;
    },
    {
      onSuccess: (e) => {
        navigate("/identify_phone", { state: { email: e } });
      },
      onError: (error) => {
        toast.warn("서버와 연결이 문제가 있거나 등록되지 않은 이메일 입니다!", {
          position: toast.POSITION.TOP_CENTER,
        });
      },
    }
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
        비밀번호 찾기 (이메일 인증)
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
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "100%" }}
            size="large"
          >
            다음
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}
