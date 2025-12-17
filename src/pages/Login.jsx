import "./Login.css";
import ROUTE from "../constants/route.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schemas/loginSchema.js";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("로그인 성공!", data);
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
