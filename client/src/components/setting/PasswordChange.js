import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";
import { loginStore } from "../../store/store.js";

import { Button, TextField, FormControl, Grid, Box } from "@mui/material/";

export default function PasswordChange() {
  const { id, nickname, phoneNumber, birthdate, residence, gender } =
    loginStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  async function put(e) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: e,
        nickname: nickname,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        residence: residence,
        gender: gender,
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("수정완료");
    } else {
      alert("오류");
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/users`);

    if (response.ok) {
      const users = await response.json();
      const user = users.find((user) => user.id === id);
      if (user.password !== e["oldPw"]) {
        alert("기존 비밀번호와 일치하지 않습니다.");
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } else {
      throw new Error("서버 통신이 원할하지 않습니다.");
    }
    await put(e["pw"]);
    window.location.reload();
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 20, ml: 25, display: "flex", justifyContent: "center" }}
      >
        <FormControl component="fieldset" variant="standard">
          <Grid container spacing={2}>
            <Grid item xs={7}>
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
            <Grid item xs={7}>
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
            <Grid item xs={7}>
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
            sx={{ mt: 3, mb: 2, width: "58%" }}
            size="large"
          >
            제출
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}
