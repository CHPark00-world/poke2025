import "./Landing.css";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";
import pikachuImg from "../../public/pikachu.jpg";

const Landing = () => {
  const navigate = useNavigate();
  const bubbleCount = 5;

  return (
    <>
      <title>포켓몬 도감 - 나만의 컬렉션</title>
      <meta name="description" content="나만의 포켓몬 컬렉션을 완성하세요." />
      <div className="landing">
        {Array.from({ length: bubbleCount }, (_, i) => (
          <div key={i} className={`bubble bubble${i + 1}`}></div>
        ))}
        <div className="img_section">
          <img src={pikachuImg} alt="포켓몬 도감 메인 이미지" />
        </div>
        <h1>포켓몬 도감</h1>
        <h4>나만의 포켓몬 컬렉션을 완성하세요.</h4>
        <button
          onClick={() => navigate(ROUTE.LOGIN)}
          aria-label="로그인 페이지로 이동"
          className="btn_section"
        >
          로그인
        </button>
      </div>
    </>
  );
};

export default Landing;
