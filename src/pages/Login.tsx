import "./Login.css";
import ROUTE from "../constants/route";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema, { LoginFormData } from "../schemas/loginSchema";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate(ROUTE.HOME);
    } catch (err) {
      const error = err as AuthError;
      console.log(error.code);

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
          break;
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
          alert("로그인에 실패 하였습니다.");
      }
    }
  };

  return (
    <>
      <div className="login">
        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <h2>Welcome back!</h2>
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
          <button type="submit">로그인</button>
          <Link to={ROUTE.SIGNUP}>회원가입</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
