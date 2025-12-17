import PokeCard from "../components/pokeCard";
import { useParams } from "react-router-dom";
import usePokemon from "../hooks/usePokemon";
import "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const pokemon = usePokemon(id);

  if (!pokemon) return <div>로딩중 ...</div>;

  return (
    <div className="detail">
      <PokeCard pokemon={pokemon} />
    </div>
  );
};

export default Detail;
