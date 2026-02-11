import "./header.css";
import { useAuth } from "../contexts/AuthContexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";
import { useCallback, useRef } from "react";

interface HeaderProps {
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
}

const Header = ({ onSearch, onSort }: HeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback(
    (value: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch],
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(ROUTE.LOGIN);
    } catch (error) {
      console.error("로그아웃 에러: ", error);
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
        className="header_search"
        type="text"
        placeholder="포켓몬 검색..."
        onChange={(e) => handleSearchChange(e.target.value)}
        aria-label="포켓몬 검색"
      />
      <select
        className="header_sort"
        defaultValue="id"
        onChange={(e) => onSort(e.target.value)}
        aria-label="정렬 방식"
      >
        <option value="id">번호순</option>
        <option value="name">이름순</option>
      </select>
      <div className="header_user">
        {user && (
          <>
            <span>{user.email?.split("@")[0]}님</span>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
