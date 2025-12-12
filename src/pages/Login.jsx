import "./Login.css";

const Login = () => {
  return (
    <>
      <div className="Login">
        <form className="login_form">
          <h2>Register With Us</h2>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="이름을 입력해주세요."
            />
            <small>Error message</small>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요."
            />
            <small>Error message</small>
          </div>
          <button>로그인</button>
          <a href="/signup">회원가입</a>
        </form>
      </div>
    </>
  );
};

export default Login;
