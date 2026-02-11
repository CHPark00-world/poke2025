import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth } from "../firebase";
import loginSchema, { LoginFormData } from "../schemas/loginSchema";
import ROUTE from "../constants/route";
import { AUTH_ERROR_MESSAGES } from "../constants/errorMessage";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setLoginError("");
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate(ROUTE.HOME);
    } catch (err) {
      const error = err as AuthError;
      const message =
        AUTH_ERROR_MESSAGES[error.code] || "로그인에 실패하였습니다.";
      setLoginError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Welcome back!</h2>

        {loginError && (
          <div className="error_message" role="alert">
            {loginError}
          </div>
        )}

        <div className="form_control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="이메일을 입력해주세요."
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <small className="error_text">{errors.email.message}</small>
          )}
        </div>

        <div className="form_control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <small className="error_text">{errors.password.message}</small>
          )}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        <Link to={ROUTE.SIGNUP}>회원가입</Link>
      </form>
    </div>
  );
};

export default Login;
