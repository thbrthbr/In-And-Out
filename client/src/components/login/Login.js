import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/form_validation";

import { useDispatch, useSelector } from "react-redux";
import { login, logout, userLogin } from "../../features/login";
import { persistor } from "../../store";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    alert("submit");
  };

  const loginState = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  const handleLogin = () => dispatch(userLogin());
  const handleLogout = () => {
    dispatch(logout());
    persistor.flush().then(() => {
      return persistor.purge();
    });
  };

  return (
    <div>
      <div>Login Page</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            name="id"
            autoComplete="username"
            placeholder="아이디(이메일)"
            {...register("email")}
          />
          <span role="alert">{errors.email?.message}</span>
        </div>
        <div>
          <input
            type="password"
            name="pw"
            autoComplete="current-password"
            placeholder="비밀번호"
            {...register("pw")}
          />
          <span role="alert">{errors.pw?.message}</span>
        </div>
        <div className="button">
          <button type="submit">로그인</button>
        </div>
      </form>
      <Link to="/calendar">Login</Link>
      <br />
      <Link to="/signin">Signin</Link>
      <br />
      <Link to="/identify_email">RecoverPassword</Link>
      <br />
      <p>{loginState ? "로그인됨" : "로그아웃됨"}</p>
      <button onClick={handleLogin}>login</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
