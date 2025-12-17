import "./Landing.css";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="img_section">
        <img src="https://cdn.pixabay.com/photo/2023/05/12/10/47/ai-generated-7988263_1280.jpg" />
      </div>
      <h1>포켓몬 도감</h1>
      <h4>나만의 포켓몬 컬렉션을 완성하세요.</h4>
      <button onClick={() => navigate(ROUTE.LOGIN)} className="btn_section">
        로그인
      </button>
    </div>
  );
};

export default Landing;
