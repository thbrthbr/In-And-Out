import React, { useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileChangeSchema } from "../../schema/form_validation";

import styled from "styled-components";
import defaultUser from "../../img/default-user.png";

export default function ProfileChange() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileChangeSchema),
  });

  const onSubmit = (data) => {
    alert("submit");
  };

  const values = [
    { value: "inandout1234@gmail.com" },
    { value: "리제로" },
    { value: "010-1010-1010" },
    { value: "1999-05-17" },
    { value: "미국" },
    { value: "남자" },
  ];

  // const valueIds = [
  //   { valueId: "이메일" },
  //   { valueId: "닉네임" },
  //   { valueId: "전화번호" },
  //   { valueId: "생년월일" },
  //   { valueId: "거주지" },
  //   { valueId: "성별" },
  // ];
  //나중에 form으로 데이터 보낼 때 쓸 Inputs id들

  const [imageFile, setImageFile] = useState(null);
  const fileInput = useRef();

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFile(reader.result);
    };
  };

  return (
    <>
      <BigPage>
        <Photo>
          <img
            alt="프로필사진"
            src={imageFile ? imageFile : defaultUser}
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
                defaultValue={values[0].value}
                readOnly
              />
            </TextInputs>

            <TextInputs>
              <Categories>닉네임</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={values[1].value}
                {...register("name")}
              />
              <Alert role="alert">{errors.name?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>전화번호</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={values[2].value}
                {...register("phone")}
              />
              <Alert role="alert">{errors.phone?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>생년월일</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={values[3].value}
                {...register("birthday")}
              />
              <Alert role="alert">{errors.birthday?.message}</Alert>
            </TextInputs>

            <TextInputs>
              <Categories>거주지</Categories>
              <Inputs
                spellCheck={false}
                type="text"
                defaultValue={values[4].value}
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
                    checked
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
