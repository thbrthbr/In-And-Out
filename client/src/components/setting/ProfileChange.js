import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ProfileChange() {
  const placeholders = [
    { placeholder: "이메일" },
    { placeholder: "닉네임" },
    { placeholder: "전화번호" },
    { placeholder: "생년월일" },
    { placeholder: "거주지" },
    { placeholder: "성별" },
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
                type="text"
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
              제출
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
