import { useState } from "react";
import "./Home.css";
import PokeList from "../components/pokeList";
import Header from "../components/header";
import Footer from "../components/footer";
import usePokemonList from "../hooks/usePokemonList";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";
import { PokemonListItem } from "../types/pokemon";

const Home = () => {
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonListItem[]>(
    []
  );
  const navigate = useNavigate();

  const { pokemons, loading } = usePokemonList();

  const handleSearch = (text: string) => {
    const filtered = pokemons.filter((item) => item.koreanName.includes(text));
    setFilteredPokemons(filtered);
  };

  const handleSort = (type: string) => {
    const sorted = [...pokemons].sort((a, b) => {
      if (type === "name") {
        return a.koreanName.localeCompare(b.koreanName);
      }
      return Number(a.url.split("/")[6]) - Number(b.url.split("/")[6]);
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
