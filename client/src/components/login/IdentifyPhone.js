import { Link } from "react-router-dom";
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

export default function IdentifyPhone() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(identifyPhoneSchema),
  });

  const onSubmit = (data) => {
    alert("submit");
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
      <Typography component="h1" variant="h5">
        비밀번호 찾기 (전화번호 인증)
      </Typography>
      <Typography component="h7" variant="h7">
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

{
  /* <Link to="/initiate">RecoverInitiate</Link> */
}
