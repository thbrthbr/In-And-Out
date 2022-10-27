import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/form_validation";

import {
  useStore2,
  useStore3,
  loginStore,
  backUpStore,
} from "../../store/store.js";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

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
  const { BU_nickname, setBU_Nickname } = backUpStore();

  const onSubmit = async (e) => {
    // e.preventDefault();
    const result = await tempFunc(e["email"], e["pw"]);
    console.log(result);
    if (result) {
      setId(e["email"]);
      setPassword(e["pw"]);
      setNickname(result.nickname);
      setBU_Nickname(result.nickname);
      setPhoneNumber(result.phoneNumber);
      setBirthdate(result.birthdate);
      setResidence(result.residence);
      setGender(result.gender);
      setLogState(true);
      // alert("반갑습니다");
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
    // console.log(localStorage.getItem("login-stuff"));
  }

  return (
    <div>
      {logState ? (
        <div> Logged in : {id} </div>
      ) : (
        <>
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
                name="password"
                autoComplete="current-password"
                placeholder="비밀번호"
                {...register("pw")}
              />
              <span role="alert">{errors.pw?.message}</span>
            </div>
            <button type="submit">로그인</button>
          </form>
        </>
      )}
      <Link to="/calendar">Login</Link>
      <br />
      <Link to="/signin">Signin</Link>
      <br />
      <Link to="/identify_email">RecoverPassword</Link>
      <br />

      <div>{logState ? "로그인됨" : "로그아웃됨"}</div>
      <button onClick={loginHandler}>로그인</button>
      <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
}
