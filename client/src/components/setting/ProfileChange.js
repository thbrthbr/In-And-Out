import React, { useRef, useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileChangeSchema } from "../../schema/form_validation";

import styled from "styled-components";
import defaultUser from "../../img/default-user.jpg";
import {
  useStore,
  useStore2,
  loginStore,
  backUpStore,
} from "../../store/store.js";

export default function ProfileChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileChangeSchema),
  });

  // const onSubmit = (data) => {
  //   alert("submit");
  // };

  const { profileImage, setprofileImage } = useStore();
  const {
    id,
    setId,
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

  const {
    BU_id,
    setBU_Id,
    BU_password,
    setBU_Password,
    BU_nickname,
    setBU_Nickname,
    BU_phoneNumber,
    setBU_PhoneNumber,
    BU_birthdate,
    setBU_Birthdate,
    BU_residence,
    setBU_Residence,
    BU_gender,
    setBU_Gender,
  } = backUpStore();

  const backUP = () => {
    if (id !== "") {
      setBU_Id(id);
    }
    if (password !== "") {
      setBU_Password(password);
    }
    if (nickname !== "") {
      setBU_Nickname(nickname);
    }
    if (phoneNumber !== "") {
      setBU_PhoneNumber(phoneNumber);
    }
    if (birthdate !== "") {
      setBU_Birthdate(birthdate);
    }
    if (residence !== "") {
      setBU_Residence(residence);
    }
    if (gender !== "") {
      setBU_Gender(gender);
    }
  };

  const fileInput = useRef();

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setprofileImage(reader.result);
    };
  };

  async function put() {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        nickname: nickname == "" ? BU_nickname : nickname,
        phoneNumber: phoneNumber == "" ? BU_phoneNumber : phoneNumber,
        birthdate: birthdate == "" ? BU_birthdate : birthdate,
        residence: residence == "" ? BU_residence : residence,
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
    // e.preventDefault();
    put();
    // console.log(JSON.stringify(e));
    console.log(BU_birthdate);
  };

  const onNameHandler = (event) => {
    setNickname(event.currentTarget.value);
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

  useEffect(() => {
    backUP();
  }, []);

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
                defaultValue={nickname == "" ? BU_nickname : nickname}
                {...register("name", { onChange: onNameHandler })}
              />
              <Alert role="alert">{errors.name?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>전화번호</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={phoneNumber == "" ? BU_phoneNumber : phoneNumber}
                {...register("phone", { onChange: onPhoneNumberHandler })}
              />
              <Alert role="alert">{errors.phone?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>생년월일</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={birthdate == "" ? BU_birthdate : birthdate}
                {...register("birthday", { onChange: onBirthdateHandler })}
              />
              <Alert role="alert">{errors.birthday?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>거주지</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={residence == "" ? BU_residence : residence}
                {...register("residence", { onChange: onResidenceHandler })}
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
                    {...register("gender", { onChange: onGenderHandler })}
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
                    {...register("gender", { onChange: onGenderHandler })}
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
