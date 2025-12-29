import { z } from "zod";

const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "이름을 입력해주세요.")
      .min(2, "이름은 최소 2자 이상이어야 합니다."),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
    password2: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.password2, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["password2"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export default signupSchema;
