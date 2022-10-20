import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../schema/form_validation";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div>Signin Page</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="id"
            placeholder="아이디(이메일)"
            {...register("email")}
          />
          <span role="alert">{errors.email?.message}</span>
        </div>
        <div>
          <input
            type="password"
            id="pw"
            placeholder="비밀번호"
            {...register("pw")}
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
            {...register("name")}
          />
          <span role="alert">{errors.name?.message}</span>
        </div>
        <div>
          <input
            type="text"
            id="phonenumber"
            placeholder="전화번호"
            {...register("phone")}
          />
          <span role="alert">{errors.phone?.message}</span>
        </div>
        <div>
          <input
            type="text"
            id="birthday"
            placeholder="생년월일"
            {...register("birthday")}
          />
          <span role="alert">{errors.birthday?.message}</span>
        </div>
        <div>
          <input type="text" id="residence" placeholder="거주지 (시/군/구)" />
          <span role="alert">{errors.residence?.message}</span>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked
              {...register("gender")}
            />
            여자
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              {...register("gender")}
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
