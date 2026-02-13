import { useState, useEffect } from "react";
import { PokemonListItem } from "../types/pokemon";

const base_url = import.meta.env.VITE_API_BASE_URL;

interface PokemonApiResult {
  name: string;
  url: string;
}

const usePokemonList = () => {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getPokemons = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${base_url}/pokemon?limit=151`);
        if (!response.ok) throw new Error("네트워크 응답 오류");
        const data = await response.json();

        const promises = data.results.map(async (pokemon: PokemonApiResult) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();

          const [speciesResponse, detailResponse] = await Promise.all([
            fetch(`${base_url}/pokemon-species/${id}`),
            fetch(pokemon.url),
          ]);

          const [speciesData, detailData] = await Promise.all([
            speciesResponse.json(),
            detailResponse.json(),
          ]);

          const koreanName =
            speciesData.names.find((name: any) => name.language.name === "ko")
              ?.name || pokemon.name;

          const detailImage =
            detailData.sprites.other.dream_world.front_default ||
            detailData.sprites.front_default;

          return {
            name: pokemon.name,
            url: pokemon.url,
            koreanName: koreanName,
            detailImage: detailImage,
          };
        });

        const newPokemons = await Promise.all(promises);
        if (isMounted) {
          setPokemons(newPokemons);
        }
      } catch (error) {
        console.log("에러:", error);
        if (isMounted) {
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getPokemons();

    return () => {
      isMounted = false;
    };
  }, []);

  return { pokemons, loading, error };
};

export default usePokemonList;
