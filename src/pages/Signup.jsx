import "./Signup.css";

const Signup = () => {
  return (
    <>
      <div className="Signup">
        <form className="signup_form">
          <h2>Let's Sing Up! </h2>
          <p className="subtitle">새로운 계정을 만들어보세요</p>
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
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력해주세요."
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
          <div className="form-control">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              id="password2"
              placeholder="비밀번호를 다시 입력해주세요."
            />
            <small>Error message</small>
          </div>
          <button>회원가입하기</button>
          <div className="terms">
            <label>
              <input type="checkbox" required />
              <span>이용약관 및 개인정보처리방침에 동의합니다</span>
            </label>
          </div>
          <p className="login-link">
            이미 계정이 있으신가요? <a href="/login">로그인</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
