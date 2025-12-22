import { useEffect, useState } from "react";
import "./Home.css";
import PokeList from "../components/pokeList";
import Header from "../components/Header";
import Footer from "../components/footer";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=255"
        );
        const data = await response.json();

        const pokemonList = [];

        for (let i = 0; i < data.results.length; i++) {
          const pokemon = data.results[i];

          const id = pokemon.url.split("/")[6];

          const speciesResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${id}`
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
        setFilteredPokemons(pokemonList);
      } catch (error) {
        console.log("에러는:", error);
      }
    };
    getPokemon();
  }, []);

  const handleSearch = (text) => {
    const filtered = pokemons.filter((item) => item.koreanName.includes(text));
    setFilteredPokemons(filtered);
  };

  const handleSort = (Type) => {
    const sorted = [...pokemons].sort((a, b) => {
      if (Type === "name") {
        return a.koreanName.localeCompare(b.koreanName);
      }
      return a.url.split("/")[6] - b.url.split("/")[6];
    });
    setFilteredPokemons(sorted);
  };

  return (
    <div className="home">
      <Header onSearch={handleSearch} onSort={handleSort} />
      <PokeList pokemons={filteredPokemons} />
      <Footer />
    </div>
  );
};

export default Home;
