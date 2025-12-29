import "./Quiz.css";
import { useEffect, useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
import { useNavigate } from "react-router-dom";
import ROUTE from "../constants/route";
import { PokemonListItem } from "../types/pokemon";

const shuffleArray = (array: PokemonListItem[]): PokemonListItem[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const { pokemons } = usePokemonList();
  const [currentPokemon, setCurrentPokemon] = useState<PokemonListItem | null>(
    null
  );
  const [options, setOptions] = useState<PokemonListItem[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const newQuiz = () => {
    if (pokemons.length > 0) {
      const answer = pokemons[Math.floor(Math.random() * pokemons.length)];
      setCurrentPokemon(answer);
      setResult(null);

      const wrong1 = pokemons[Math.floor(Math.random() * pokemons.length)];
      const wrong2 = pokemons[Math.floor(Math.random() * pokemons.length)];
      const wrong3 = pokemons[Math.floor(Math.random() * pokemons.length)];

      const all = [answer, wrong1, wrong2, wrong3];
      const shuffled = shuffleArray(all);
      setOptions(shuffled);
    }
  };

  useEffect(() => {
    newQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  const handleClick = (pokemon: PokemonListItem) => {
    if (currentPokemon && pokemon.koreanName === currentPokemon.koreanName) {
      alert("정답!");
      setResult(true);
    } else {
      alert("틀렸어요!");
      setResult(false);
    }
  };

  return (
    <div className="Quiz">
      <button onClick={() => navigate(ROUTE.HOME)} className="back_btn">
        뒤로가기
      </button>
      <h2>다음 포켓몬의 이름을 맞춰주세요 !</h2>
      {currentPokemon ? (
        <>
          <img src={currentPokemon.detailImage} alt="포켓몬" />
          <div>
            {options.map((pokemon, index) => (
              <button key={index} onClick={() => handleClick(pokemon)}>
                {pokemon.koreanName}
              </button>
            ))}
          </div>
          {result ? (
            <button className="next_btn" onClick={newQuiz}>
              다음 문제 ➡️
            </button>
          ) : null}
        </>
      ) : (
        <p>로딩 중 ...</p>
      )}
    </div>
  );
};

export default Quiz;
