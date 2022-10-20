import styled from "styled-components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";

export default function Signout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverInitiateSchema),
  });

  const onSubmit = (data) => {
    alert("submit");
  };

  // const valueIds = [{ valueId: "비밀번호" }, { valueId: "비밀번호 확인" }];
  //나중에 form으로 데이터 보낼 때 쓸 input id들

  return (
    <>
      <Page>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput>
            <input
              placeholder="비밀번호"
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
              placeholder="비밀번호 확인"
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
              탈퇴하기
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
