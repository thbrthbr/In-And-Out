import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../schema/form_validation";

import { loginStore, useStore2 } from "../../store/store.js";

export default function Signin() {
  const {
    id,
    password,
    phoneNumber,
    nickname,
    birthdate,
    residence,
    gender,
    setId,
    setPassword,
    setNickname,
    setPhoneNumber,
    setBirthdate,
    setResidence,
    setGender,
  } = loginStore();

  const { setLogState } = useStore2();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  async function post() {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        password: password,
        nickname: nickname,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        residence: residence,
        gender: gender,
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("회원가입 성공");
      setLogState(true);
      navigate("/");
    } else {
      alert("이미 존재하는 아이디입니다");
    }
  }

  const onSubmit = (data) => {
    post();
    console.log(id);
  };

  const onEmailHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  };
  const onBirthdateHandler = (event) => {
    setBirthdate(event.currentTarget.value);
  };
  const onResidenceHandler = (event) => {
    setResidence(event.currentTarget.value);
  };
  const onGenderHandler = (event) => {
    setGender(event.currentTarget.value);
  };

  // useEffect(() => {
  //   post();
  // }, [id]);

  return (
    <div>
      <div>Signin Page</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="id"
            placeholder="아이디(이메일)"
            {...register("email", { onChange: onEmailHandler })}
          />
          <span role="alert">{errors.email?.message}</span>
        </div>
        <div>
          <input
            type="password"
            id="pw"
            placeholder="비밀번호"
            {...register("pw", { onChange: onPasswordHandler })}
          />
          <span role="alert">{errors.pw?.message}</span>
        </div>
        <div>
          <input
            type="password"
            id="pw_check"
            placeholder="비밀번호(확인)"
            {...register("passwordConfirm")}
          />
          <span role="alert">{errors.passwordConfirm?.message}</span>
        </div>
        <div>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임"
            {...register("name", { onChange: onNameHandler })}
          />
          <span role="alert">{errors.name?.message}</span>
        </div>
        <div>
          <input
            type="text"
            id="phonenumber"
            placeholder="전화번호"
            {...register("phone", { onChange: onPhoneNumberHandler })}
          />
          <span role="alert">{errors.phone?.message}</span>
        </div>
        <div>
          <input
            type="text"
            id="birthday"
            placeholder="생년월일"
            {...register("birthday", { onChange: onBirthdateHandler })}
          />
          <span role="alert">{errors.birthday?.message}</span>
        </div>
        <div>
          <input
            type="text"
            id="residence"
            placeholder="거주지 (시/군/구)"
            {...register("residence", { onChange: onResidenceHandler })}
          />
          <span role="alert">{errors.residence?.message}</span>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={onGenderHandler}
              {...register("gender", { onChange: onGenderHandler })}
            />
            여자
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={onGenderHandler}
              {...register("gender", { onChange: onGenderHandler })}
            />
            남자
          </label>
          <span role="alert">{errors.gender?.message}</span>
        </div>

        <div className="button">
          <button type="submit">가입하기</button>
        </div>
      </form>
      <Link to="/">Login</Link>
    </div>
  );
}
