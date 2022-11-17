import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";
import {
  useSnsLogStateStore,
  useStore2,
  loginStore,
} from "../../store/store.js";
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
  const { snsLogState, setSnsLogState } = useSnsLogStateStore();
  const { logState, setLogState } = useStore2();
  const { id } = loginStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  const sendToServer = async (passwordData) => {
    console.log(passwordData);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/member/info`,
        { data: passwordData, withCredentials: true }
      );

      toast.success("회원탈퇴가 성공적으로 처리됐습니다! ", {
        position: toast.POSITION.TOP_CENTER,
      });

      setLogState(false);
      setSnsLogState(false);
      sessionStorage.clear();

      setTimeout(() => {
        navigate("/");
      }, 0);
      return res.data;
    } catch (err) {
      console.log(err);
      toast.warn("회원탈퇴 처리에 실패했습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const onSubmit = (data) => {
    console.log(data, id);
    const passwordData = {
      password: !snsLogState ? data.passwordConfirm : id,
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
          {!snsLogState && (
            <>
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
            </>
          )}

          {snsLogState && (
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "100%" }}
              size="large"
              onClick={onSubmit}
            >
              탈퇴
            </Button>
          )}
        </FormControl>
      </Box>
    </Box>
  );
}
