import "./pokeListItem.css";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";

function PokeListItem({ pokemon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const id = pokemon.url.split("/")[6];
    navigate(ROUTE.DETAIL(id));
  };

  return (
    <div onClick={handleClick} className="pokelistitem">
      <img src={pokemon.detailImage} style={{ width: "100px" }} />
      <h3>{pokemon.koreanName}</h3>
    </div>
  );
}

export default PokeListItem;
