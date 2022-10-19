import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { identifyPhoneSchema } from "../../schema/form_validation";

export default function IdentifyPhone() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(identifyPhoneSchema),
  });

  const onSubmit = (data) => {
    alert("submit");
  };

  return (
    <div>
      <div>IdentifyPhone</div>
      <p>비밀번호는 이메일과 전화번호를 통해 찾을 수 있습니다</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" id="email" value="입력한 이메일" disabled />
        </div>
        <div>
          <input
            type="tel"
            id="phonenumber"
            placeholder="전화번호"
            {...register("phone")}
          />
          <span role="alert">{errors.phone?.message}</span>
        </div>
        <div className="button">
          <button type="submit">다음</button>
        </div>
      </form>
      <Link to="/initiate">RecoverInitiate</Link>
    </div>
  );
}
