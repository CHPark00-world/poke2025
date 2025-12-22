import { useRef } from "react";
import "./header.css";
import { useAuth } from "../contexts/AuthContexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";

const Header = ({ onSearch, onSort }) => {
  const inputRef = useRef();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(ROUTE.LOGIN);
    } catch (error) {
      console.log(error);
      alert("로그아웃 실패");
    }
  };

  return (
    <div className="header">
      <img
        className="header_logo"
        src="https://logos-world.net/wp-content/uploads/2020/05/Pokemon-Logo.png"
        alt="pokemon Logo"
      />
      <input
        ref={inputRef}
        className="header_search"
        type="text"
        placeholder="포켓몬 검색..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <select className="header_sort" onChange={(e) => onSort(e.target.value)}>
        <option value="id">번호순</option>
        <option value="name">이름순</option>
      </select>
      <div className="header_user">
        {user && (
          <>
            <span>{user.email.split("@")[0]}님</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
