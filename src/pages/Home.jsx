import { useState } from "react";
import "./Home.css";
import PokeList from "../components/pokeList";
import Header from "../components/Header";
import Footer from "../components/footer";
import usePokemonList from "../hooks/usePokemonList";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";

const Home = () => {
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const navigate = useNavigate();

  const { pokemons, loading } = usePokemonList();

  const handleSearch = (text) => {
    const filtered = pokemons.filter((item) => item.koreanName.includes(text));
    setFilteredPokemons(filtered);
  };

  const handleSort = (Type) => {
    const sorted = [...pokemons].sort((a, b) => {
      if (Type === "name") {
        return a.koreanName.localeCompare(b.koreanName);
      }
      return a.url.split("/")[6] - b.url.split("/")[6];
    });
    setFilteredPokemons(sorted);
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <div className="home">
      <Header onSearch={handleSearch} onSort={handleSort} />
      <button className="quiz_btn" onClick={() => navigate(ROUTE.QUIZ)}>
        퀴즈 풀기
      </button>
      <PokeList
        pokemons={filteredPokemons.length > 0 ? filteredPokemons : pokemons}
      />
      <Footer />
    </div>
  );
};

export default Home;
