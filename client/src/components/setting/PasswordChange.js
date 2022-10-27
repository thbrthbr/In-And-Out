import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";
import { loginStore } from "../../store/store.js";

export default function PasswordChange() {
  const { id, nickname, phoneNumber, birthdate, residence, gender } =
    loginStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  async function put(e) {
    const response = await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: e,
        nickname: nickname,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        residence: residence,
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
    const response = await fetch(`http://localhost:4000/users`);

    if (response.ok) {
      const users = await response.json();
      const user = users.find((user) => user.id === id);
      if (user.password !== e["oldPw"]) {
        alert("기존 비밀번호와 일치하지 않습니다.");
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } else {
      throw new Error("서버 통신이 원할하지 않습니다.");
    }
    await put(e["pw"]);
    window.location.reload();
  };

  return (
    <>
      <Page>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput>
            <input
              placeholder="이전 비밀번호"
              style={{
                padding: 0,
                outline: "none",
                fontSize: "20px",
                width: "296px",
                height: "30px",
              }}
              type="password"
              {...register("oldPw")}
            />
          </TextInput>
          <TextInput>
            <input
              placeholder="새 비밀번호"
              style={{
                padding: 0,
                outline: "none",
                fontSize: "20px",
                width: "296px",
                height: "30px",
              }}
              type="password"
              {...register("pw")}
            />
            <Alert role="alert">{errors.pw?.message}</Alert>
          </TextInput>

          <TextInput>
            <input
              placeholder="새 비밀번호 확인"
              style={{
                padding: 0,
                outline: "none",
                fontSize: "20px",
                width: "296px",
                height: "30px",
              }}
              type="password"
              {...register("passwordConfirm")}
            />
            <Alert role="alert">{errors.passwordConfirm?.message}</Alert>
          </TextInput>
          <ButtonInput>
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
          </ButtonInput>
        </form>
      </Page>
    </>
  );
}

const Alert = styled.span`
  font-size: 15px;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInput = styled.div`
  margin-top: 30px;
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: column;
`;

const ButtonInput = styled.div`
  margin-top: 30px;
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
`;
