import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverInitiateSchema } from "../../schema/form_validation";

export default function RecoverInitiate() {
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

  return (
    <div>
      <div>RecoverInitiate</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="password"
            id="newpassword"
            autoComplete="username current-password"
            placeholder="새 비밀번호"
            {...register("pw")}
          />
          <span role="alert">{errors.pw?.message}</span>
        </div>
        <div>
          <input
            type="password"
            id="newpassword_check"
            autoComplete="username current-password"
            placeholder="새 비밀번호 확인"
            {...register("passwordConfirm")}
          />
          <span role="alert">{errors.passwordConfirm?.message}</span>
        </div>
        <div className="button">
          <button type="submit">변경</button>
        </div>
      </form>
      <Link to="/calendar">Login</Link>
    </div>
  );
}
