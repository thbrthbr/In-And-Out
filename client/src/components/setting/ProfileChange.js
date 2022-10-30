import React, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileChangeSchema } from "../../schema/form_validation";

import styled from "styled-components";
import defaultUser from "../../img/default-user.jpg";
import { useStore, useStore2, loginStore } from "../../store/store.js";

export default function ProfileChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileChangeSchema),
  });

  const { profileImage, setProfileImage } = useStore();
  const {
    id,
    password,
    nickname,
    setNickname,
    phoneNumber,
    setPhoneNumber,
    birthdate,
    setBirthdate,
    residence,
    setResidence,
    gender,
    setGender,
  } = loginStore();

  const fileInput = useRef();

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = async () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
      console.log(reader.result);
      ImagePut(reader.result);
    };
  };

  async function ImagePut(e) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        nickname: nickname,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        residence: residence,
        gender: gender,
        profileImage: e == null ? profileImage : e,
      }),
    });

    console.log(response);

    if (response.ok) {
      alert("수정완료");
    } else {
      alert("오류");
    }
  }

  async function put(e) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        nickname: e["name"],
        phoneNumber: e["phone"],
        birthdate: e["birthday"],
        residence: e["residence"],
        gender: e["gender"],
        profileImage: profileImage,
      }),
    });

    console.log(response);

    if (response.ok) {
      setNickname(e["name"]);
      setPhoneNumber(e["phone"]);
      setBirthdate(e["birthday"]);
      setResidence(e["residence"]);
      setGender(e["gender"]);
      alert("수정완료");
    } else {
      alert("오류");
    }
  }

  const onSubmit = async (e) => {
    put(e);
  };

  return (
    <>
      <BigPage>
        <Photo>
          <img
            alt="프로필사진"
            src={profileImage ? profileImage : defaultUser}
            style={{ width: "200px" }}
          />
          <File onClick={handleButtonClick} htmlFor="input-file">
            이미지 업로드
          </File>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleChange}
          />
        </Photo>
        <Page>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputs>
              <Categories>이메일</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={id}
                readOnly
              />
            </TextInputs>

            <TextInputs>
              <Categories>닉네임</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={nickname}
                {...register("name")}
              />
              <Alert role="alert">{errors.name?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>전화번호</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={phoneNumber}
                {...register("phone")}
              />
              <Alert role="alert">{errors.phone?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>생년월일</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={birthdate}
                {...register("birthday")}
              />
              <Alert role="alert">{errors.birthday?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>거주지</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={residence}
                {...register("residence")}
              />
              <Alert role="alert">{errors.residence?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>성별</Categories>
              <div
                style={{
                  width: "300px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    여자
                  </div>
                  <Radio
                    type="radio"
                    name="gender"
                    value="female"
                    defaultChecked={gender === "female" ? true : false}
                    {...register("gender")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    남자
                  </div>
                  <Radio
                    type="radio"
                    name="gender"
                    value="male"
                    defaultChecked={gender === "male" ? true : false}
                    {...register("gender")}
                  />
                </div>
              </div>
              <Alert role="alert">{errors.gender?.message}</Alert>
            </TextInputs>

            <ButtonInputs>
              <button
                style={{
                  fontSize: "20px",
                  width: "300px",
                  height: "30px",
                  cursor: "pointer",
                }}
                type="submit"
              >
                제출
              </button>
            </ButtonInputs>
          </form>
        </Page>
      </BigPage>
    </>
  );
}

const Radio = styled.input`
  width: 30px;
  height: 30px;
`;

const File = styled.button`
  font-size: 15px;
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:active {
    background-color: pink;
  }
`;

const Categories = styled.h4`
  margin: 0px;
`;

const Inputs = styled.input`
  margin-top: 5px;
  outline: none;
  width: 296px;
  padding: 0;
  font-size: 20px;
`;

const Alert = styled.span`
  font-size: 15px;
`;

const Photo = styled.div`
  margin: 120px;
  display: flex;
  flex-direction: column;
`;

const BigPage = styled.div`
  display: flex;
  flex-direction: row;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInputs = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  // align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const ButtonInputs = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  align-items: center;
`;
