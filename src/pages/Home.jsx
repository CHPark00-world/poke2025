import { useEffect, useState } from "react";
import "./Home.css";
import PokeList from "../components/pokeList";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        const data = await response.json();

        const pokemonList = [];

        for (let i = 0; i < data.results.length; i++) {
          const pokemon = data.results[i];

          const id = pokemon.url.split("/")[6];

          const speciesResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
          );
          const speiesData = await speciesResponse.json();
          const koreanName = speiesData.names[2].name;

          const detailResponse = await fetch(pokemon.url);
          const detailData = await detailResponse.json();
          const detailImage =
            detailData.sprites.other.dream_world.front_default;

          pokemonList.push({
            ...pokemon,
            koreanName: koreanName,
            detailImage: detailImage,
          });
        }

        setPokemons(pokemonList);
      } catch (error) {
        console.log("에러는:", error);
      }
    };
    getPokemon();
  }, []);

  return (
    <div className="home">
      <PokeList pokemons={pokemons} />
    </div>
  );
};

export default Home;
