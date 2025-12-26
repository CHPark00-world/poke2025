import { useState, useEffect } from "react";

const base_url = import.meta.env.VITE_API_BASE_URL;

const usePokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${base_url}/pokemon?limit=151`);
        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
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

          return {
            name: pokemon.name,
            url: pokemon.url,
            koreanName: koreanName,
            detailImage: detailImage,
          };
        });

        const newPokemons = await Promise.all(promises);
        setPokemons(newPokemons);
      } catch (error) {
        console.log("에러:", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, []);

  return { pokemons, loading };
};

export default usePokemonList;
