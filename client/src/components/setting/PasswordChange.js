import { Link } from "react-router-dom";
import styled from "styled-components";
// import React, { useState } from "react";

export default function PasswordChange() {
  // const [button, setButton] = useState();

  const placeholders = [
    { placeholder: "이전 비밀번호" },
    { placeholder: "새 비밀번호" },
    { placeholder: "새 비밀번호 확인" },
  ];

  return (
    <>
      <Page>
        {placeholders.map((list) => (
          <TextInput>
            <input
              placeholder={list.placeholder}
              style={{
                padding: 0,
                border: "none",
                fontSize: "30px",
                width: "500px",
                height: "40px",
              }}
              type="password"
            />
          </TextInput>
        ))}

        <ButtonInput>
          <button
            style={{
              fontSize: "30px",
              width: "500px",
              height: "40px",
            }}
          >
            제출
          </button>
        </ButtonInput>
      </Page>
    </>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInput = styled.div`
  width: 500px;
  height: 100px;

  display: flex;
  align-items: center;
`;

const ButtonInput = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  align-items: center;
`;
