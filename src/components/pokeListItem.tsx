import "./pokeListItem.css";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";
import { PokemonListItem as PokemonListItemType } from "../types/pokemon";

interface PokeListItemProps {
  pokemon: PokemonListItemType;
}

function PokeListItem({ pokemon }: PokeListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const urlParts = pokemon.url.split("/").filter(Boolean);
    const id = urlParts[urlParts.length - 1];
    navigate(ROUTE.DETAIL(id));
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      className="pokelistitem"
    >
      <img
        src={pokemon.detailImage}
        alt={pokemon.koreanName}
        className="pokelistitem_image"
        loading="lazy"
      />
      <h3>{pokemon.koreanName}</h3>
    </div>
  );
}

export default PokeListItem;
