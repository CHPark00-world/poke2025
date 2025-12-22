import { useEffect, useState } from "react";

const base_url = import.meta.env.VITE_API_BASE_URL;

const usePokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(`${base_url}/pokemon?limit=255`);
        const data = await response.json();

        const pokemonList = [];

        for (let i = 0; i < data.results.length; i++) {
          const pokemon = data.results[i];

          const id = pokemon.url.split("/")[6];

          const speciesResponse = await fetch(
            `${base_url}/pokemon-species/${id}`
          );
          const speciesData = await speciesResponse.json();
          const koreanName = speciesData.names[2].name;

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

  return { pokemons };
};

export default usePokemonList;
