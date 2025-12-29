import "./Signup.css";
import ROUTE from "../constants/route";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema, { SignupFormData } from "../schemas/signupSchema";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      alert("회원가입 성공!");
      navigate(ROUTE.LOGIN);
    } catch (err) {
      const error = err as AuthError;
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("이미 사용 중인 이메일입니다.");
          break;
        case "auth/weak-password":
          alert("비밀번호는 6글자 이상이어야 합니다.");
          break;
        case "auth/network-request-failed":
          alert("네트워크 연결에 실패 하였습니다.");
          break;
        case "auth/invalid-email":
          alert("잘못된 이메일 형식입니다.");
          break;
        case "auth/internal-error":
          alert("잘못된 요청입니다.");
          break;
        default:
          alert("회원가입에 실패 하였습니다.");
      }
    }
  };

  return (
    <>
      <div className="signup">
        <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Let's Sign Up! </h2>
          <p className="subtitle">새로운 계정을 만들어보세요</p>
          <div className="form_control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="이름을 입력해주세요."
              {...register("username")}
            />
            {errors.username && (
              <small style={{ visibility: "visible" }}>
                {errors.username.message}
              </small>
            )}
          </div>
          <div className="form_control">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요."
              {...register("email")}
            />
            {errors.email && (
              <small style={{ visibility: "visible" }}>
                {errors.email.message}
              </small>
            )}
          </div>
          <div className="form_control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
              {...register("password")}
            />
            {errors.password && (
              <small style={{ visibility: "visible" }}>
                {errors.password.message}
              </small>
            )}
          </div>
          <div className="form_control">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              placeholder="비밀번호를 다시 입력해주세요."
              {...register("password2")}
            />
            {errors.password2 && (
              <small style={{ visibility: "visible" }}>
                {errors.password2.message}
              </small>
            )}
          </div>
          <button type="submit">회원가입하기</button>
          <div className="terms">
            <label>
              <input type="checkbox" required />
              <span>이용약관 및 개인정보처리방침에 동의합니다</span>
            </label>
          </div>
          <p className="login_link">
            이미 계정이 있으신가요? <Link to={ROUTE.LOGIN}>로그인</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
