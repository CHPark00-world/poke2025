import PokeCard from "../components/pokeDetail";
import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const pokemon = usePokemon(Number(id));

  if (!pokemon) return <div>로딩중 ...</div>;

  return (
    <div className="detail">
      <PokeCard pokemon={pokemon} />
    </div>
  );
};

export default Detail;
