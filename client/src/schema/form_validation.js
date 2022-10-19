import * as yup from "yup";

const identifyEmailSchema = yup.object({
  email: yup
    .string()
    .email("유효하지 않은 이메일입니다.")
    .required("이메일 입력은 필수입니다."),
});

const identifyPhoneSchema = yup.object({
  phone: yup
    .string()
    .required("전화번호 입력은 필수입니다.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "전화번호 양식에 맞게 입력해주세요"
    ),
});

const recoverInitiateSchema = yup.object({
  pw: yup
    .string()
    .required("비밀번호 입력은 필수입니다.")
    .min(8, "비밀번호는 최소 8자리 이상 입니다.")
    .max(20, "비밀번호는 최대 20자리 이하 입니다.")
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/,
      "비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("pw"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email("유효하지 않은 이메일입니다.")
    .required("이메일 입력은 필수입니다."),
  pw: yup
    .string()
    .required("비밀번호 입력은 필수입니다.")
    .min(8, "비밀번호는 최소 8자리 이상 입니다.")
    .max(20, "비밀번호는 최대 20자리 이하 입니다.")
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/,
      "비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
});

const signInSchema = yup.object({
  email: yup
    .string()
    .email("유효하지 않은 이메일입니다.")
    .required("이메일 입력은 필수입니다."),
  pw: yup
    .string()
    .required("비밀번호 입력은 필수입니다.")
    .min(8, "비밀번호는 최소 8자리 이상 입니다.")
    .max(20, "비밀번호는 최대 20자리 이하 입니다.")
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*[!@#$%^*+=-]).{8,16}$/,
      "비밀번호는 반드시 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("pw"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
  name: yup.string().required("닉네임 입력은 필수입니다."),
  phone: yup
    .string()
    .required("전화번호 입력은 필수입니다.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "전화번호 양식에 맞게 입력해주세요"
    ),
  birthday: yup
    .string()
    .required("생년월일 입력은 필수 입니다.")
    .matches(
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
      "생년월일 양식에 맞게 입력해주세요"
    ),
  residence: yup.string().required("거주지 입력은 필수 입니다"),
  gender: yup.string().required("성별 선택은 필수 입니다."),
  // logo_image: yup
  //   .mixed()
  //   .test("required", "이미지 파일을 선택해주세요!", (value) => {
  //     return value && value.length;
  //   })
  //   .test("type", "png/jpeg/jpg 형식의 파일을 선택해주세요!", function (value) {
  //     return (
  //       value &&
  //       value[0] &&
  //       (value[0].type === "image/jpeg" ||
  //         value[0].type === "image/jpg" ||
  //         value[0].type === "image/png")
  //     );
  //   })
  //   .test("fileSize", "파일 사이즈가 너무 큽니다!", (value, context) => {
  //     return value && value[0] && value[0].size <= 200000;
  //   }),
});

const profileChangeSchema = yup.object({
  // email: yup
  //   .string()
  //   .email("유효하지 않은 이메일입니다.")
  //   .required("이메일 입력은 필수입니다."),

  name: yup.string().required("닉네임 입력은 필수입니다."),

  phone: yup
    .string()
    .required("전화번호 입력은 필수입니다.")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "전화번호 양식에 맞게 입력해주세요"
    ),

  birthday: yup
    .string()
    .required("생년월일 입력은 필수 입니다.")
    .matches(
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
      "생년월일 양식에 맞게 입력해주세요"
    ),
  residence: yup.string().required("거주지 입력은 필수 입니다"),
  gender: yup.string().required("성별 선택은 필수 입니다."),
});

export {
  signInSchema,
  loginSchema,
  identifyEmailSchema,
  identifyPhoneSchema,
  recoverInitiateSchema,
  profileChangeSchema,
};
