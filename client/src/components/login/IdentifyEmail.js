import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { identifyEmailSchema } from "../../schema/form_validation";

export default function IdentifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(identifyEmailSchema),
  });

  const onSubmit = (data) => {
    alert("submit");
  };

  return (
    <div>
      <div>IdentifyEmail</div>
      <p>비밀번호는 이메일과 전화번호를 통해 찾을 수 있습니다</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            id="email"
            placeholder="아이디(이메일)"
            {...register("email")}
          />
          <span role="alert">{errors.email?.message}</span>
        </div>
        <div className="button">
          <button type="submit">다음</button>
        </div>
      </form>
      <Link to="/identify_phone">IdentifyPhone</Link>
    </div>
  );
}
