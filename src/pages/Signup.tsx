import "./Signup.css";
import ROUTE from "../constants/route";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema, { SignupFormData } from "../schemas/signupSchema";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

// 에러 메시지 상수화
const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
  "auth/weak-password": "비밀번호는 6글자 이상이어야 합니다.",
  "auth/network-request-failed": "네트워크 연결에 실패하였습니다.",
  "auth/invalid-email": "잘못된 이메일 형식입니다.",
  "auth/internal-error": "잘못된 요청입니다.",
} as const;

type AuthErrorCode = keyof typeof AUTH_ERROR_MESSAGES;

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. 사용자 계정 생성
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      // 2. 사용자 프로필에 username 저장
      await updateProfile(userCredential.user, {
        displayName: data.username,
      });

      // 3. 성공 후 로그인 페이지로 이동 (1.5초 후)
      setError("회원가입 성공! 로그인 페이지로 이동합니다...");
      setTimeout(() => {
        navigate(ROUTE.LOGIN);
      }, 1500);
    } catch (err) {
      const authError = err as AuthError;
      console.error("Signup error:", authError);

      const errorMessage =
        AUTH_ERROR_MESSAGES[authError.code as AuthErrorCode] ||
        `회원가입에 실패하였습니다. (${authError.code})`;

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="signup_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Let's Sign Up!</h2>
        <p className="subtitle">새로운 계정을 만들어보세요</p>

        {/* 전역 에러/성공 메시지 */}
        {error && (
          <div
            className={
              error.includes("성공") ? "success-message" : "error-message"
            }
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Username 필드 */}
        <div className="form_control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            autoComplete="username"
            placeholder="이름을 입력해주세요."
            disabled={isLoading}
            {...register("username")}
          />
          <small
            className={errors.username ? "error-visible" : "error-hidden"}
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.username?.message || "\u00A0"}
          </small>
        </div>

        {/* Email 필드 */}
        <div className="form_control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            placeholder="이메일을 입력해주세요."
            disabled={isLoading}
            {...register("email")}
          />
          <small
            className={errors.email ? "error-visible" : "error-hidden"}
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.email?.message || "\u00A0"}
          </small>
        </div>

        {/* Password 필드 */}
        <div className="form_control">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input
              id="password"
              autoComplete="new-password"
              placeholder="비밀번호를 입력해주세요."
              disabled={isLoading}
              {...register("password")}
            />
          </div>
          <small
            className={errors.password ? "error-visible" : "error-hidden"}
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.password?.message || "\u00A0"}
          </small>
        </div>

        {/* Confirm Password 필드 */}
        <div className="form_control">
          <label htmlFor="password2">Confirm Password</label>
          <div className="password-input-wrapper">
            <input
              id="password2"
              autoComplete="new-password"
              placeholder="비밀번호를 다시 입력해주세요."
              disabled={isLoading}
              {...register("password2")}
            />
          </div>
          <small
            className={errors.password2 ? "error-visible" : "error-hidden"}
            aria-live="polite"
            aria-atomic="true"
          >
            {errors.password2?.message || "\u00A0"}
          </small>
        </div>

        {/* 약관 동의 */}
        <div className="terms">
          <label>
            <input
              type="checkbox"
              disabled={isLoading}
              {...register("terms")}
            />
            <span>이용약관 및 개인정보처리방침에 동의합니다</span>
          </label>
          {errors.terms && (
            <small className="error-visible" aria-live="polite">
              {errors.terms.message}
            </small>
          )}
        </div>

        {/* 제출 버튼 */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              처리 중...
            </>
          ) : (
            "회원가입하기"
          )}
        </button>

        {/* 로그인 링크 */}
        <p className="login_link">
          이미 계정이 있으신가요? <Link to={ROUTE.LOGIN}>로그인</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
