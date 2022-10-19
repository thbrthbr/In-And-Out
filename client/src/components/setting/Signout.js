import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Signout() {
  const placeholders = [
    { placeholder: "이메일", type: "text" },
    { placeholder: "비밀번호", type: "password" },
    { placeholder: "비밀번호 확인", type: "password" },
  ];

  return (
    <>
      <Page>
        <form>
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
                type={list.type}
              />
            </TextInput>
          ))}
          <ButtonInput>
            <button
              style={{
                fontSize: "30px",
                width: "500px",
                height: "40px",
                cursor: "pointer",
              }}
              type="submit"
            >
              탈퇴하기
            </button>
          </ButtonInput>
        </form>
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
