import { useMemo, useState } from "react";
import "./Home.css";
import PokeList from "../components/pokeList";
import Header from "../components/header";
import Footer from "../components/footer";
import usePokemonList from "../hooks/usePokemonList";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";
import { PokemonListItem } from "../types/pokemon";

const Home = () => {
  const [filteredPokemons, setFilteredPokemons] = useState<
    PokemonListItem[] | null
  >(null);
  const navigate = useNavigate();

  const { pokemons, loading } = usePokemonList();

  const handleSearch = (text: string) => {
    const filtered = pokemons.filter((item) => item.koreanName.includes(text));
    setFilteredPokemons(filtered);
  }; // 검색기능

  const handleSort = (type: string) => {
    const listToSort = filteredPokemons ?? pokemons;

    const sorted = [...listToSort].sort((a, b) => {
      if (type === "name") {
        return a.koreanName.localeCompare(b.koreanName);
      }
      const getIdFromUrl = (url: string) => {
        const parts = url.split("/").filter(Boolean);
        return Number(parts[parts.length - 1]);
      };
      return getIdFromUrl(a.url) - getIdFromUrl(b.url);
    });
    setFilteredPokemons(sorted);
  };

  const displayPokemons = useMemo(() => {
    return filteredPokemons ?? pokemons;
  }, [filteredPokemons, pokemons]);

  return (
    <div className="home">
      <Header onSearch={handleSearch} onSort={handleSort} />
      {loading ? (
        <div className="loading_container">로딩 중...</div>
      ) : (
        <>
          <button className="quiz_btn" onClick={() => navigate(ROUTE.QUIZ)}>
            퀴즈 풀기
          </button>
          {filteredPokemons !== null && filteredPokemons.length === 0 ? (
            <div className="no_results">검색 결과가 없습니다.</div>
          ) : (
            <PokeList pokemons={displayPokemons} />
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
