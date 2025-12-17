import { useEffect, useState } from "react";

const usePokemon = (id) => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const detailRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const detailData = await detailRes.json();

        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData = await speciesRes.json();

        const koreanName = speciesData.names[2].name;
        const englishName = detailData.name;
        const detailImage = detailData.sprites.other.dream_world.front_default;
        const pokemonId = detailData.id;
        const types = detailData.types;
        const height = detailData.height / 10;
        const weight = detailData.weight / 10;
        const description = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "ko"
        )?.flavor_text;
        const stats = detailData.stats;

        setPokemon({
          ...detailData,
          koreanName,
          detailImage,
          englishName,
          pokemonId,
          types,
          height,
          weight,
          description,
          stats,
        });
      } catch (error) {
        console.log("에러: ", error);
      }
    };

    getPokemonDetail();
  }, [id]);

  return pokemon;
};

export default usePokemon;
