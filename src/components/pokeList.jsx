import "./pokeList.css";
import PokeCard from "./pokeCard";

const PokeList = ({ pokemons }) => {
  return (
    <div className="pokelist">
      {pokemons.map((item) => (
        <PokeCard key={item.name} pokemon={item} />
      ))}
    </div>
  );
};

export default PokeList;
