import PokeCard from "../components/pokeDetail";
import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon, loading, error } = usePokemon(Number(id));

  // 로딩 중
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>포켓몬 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="error-container">
        <h2>오류가 발생했습니다</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // 데이터 없음
  if (!pokemon) {
    return (
      <div className="no-data-container">
        <p>포켓몬 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 정상 렌더링
  return (
    <div className="detail">
      <PokeCard pokemon={pokemon} />
    </div>
  );
};

export default Detail;
