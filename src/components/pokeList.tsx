import { useEffect, useState } from "react";
import "./pokeList.css";
import PokeListItem from "./pokeListItem.tsx";
import { PokemonListItem } from "../types/pokemon";

interface PokeListProps {
  pokemons: PokemonListItem[];
}

const PokeList = ({ pokemons }: PokeListProps) => {
  const [displayCount, setDisplayCount] = useState<number>(28);
  const itemsPerPage = 28;

  const currentPokemons = pokemons.slice(0, displayCount);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        if (displayCount < pokemons.length) {
          setDisplayCount((prev) => prev + itemsPerPage);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayCount, pokemons.length]);

  return (
    <div className="pokelist_container">
      <div className="pokelist">
        {currentPokemons.map((item) => (
          <PokeListItem key={item.url} pokemon={item} />
        ))}
      </div>
      {displayCount < pokemons.length && (
        <div
          className="loading"
          style={{ textAlign: "center", padding: "20px" }}
        >
          스크롤을 내리면 더 보기...
        </div>
      )}
    </div>
  );
};

export default PokeList;
