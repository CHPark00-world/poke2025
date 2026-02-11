import "./pokeDetail.css";
import { useNavigate } from "react-router-dom";
import TYPE from "../constants/type";
import StatBar from "./statBar.tsx";
import ROUTE from "../constants/route";
import { PokemonDetail as PokemonDetailType } from "../types/pokemon";

interface PokemonDetailProps {
  pokemon: PokemonDetailType;
}

const PokeDetail = ({ pokemon }: PokemonDetailProps) => {
  const navigate = useNavigate();
  const stats = pokemon.stats || [];

  return (
    <div className="detail_container">
      <button onClick={() => navigate(ROUTE.HOME)} className="back_btn">
        ← 뒤로가기
      </button>
      <div className="pokemon_detail_card">
        <div className="info_section">
          <div className="top_row">
            <div className="image_section">
              <img src={pokemon.detailImage} alt={pokemon.koreanName} />
              <span>#{pokemon.pokemonId}</span>
            </div>
            <div className="name_section">
              <h1 className="korean_name">{pokemon.koreanName}</h1>
              <h4 className="english_name">{pokemon.englishName}</h4>
              <div className="type_info">
                {pokemon.types?.map((types, index) => (
                  <span key={index} className="type_badge">
                    {TYPE[types.type.name]}
                  </span>
                ))}
              </div>
              <p className="description">{pokemon.description}</p>
              <div className="size_section">
                <span>키: {pokemon.height}m</span>
                <span>몸무게: {pokemon.weight}kg</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ability_section">
          <h3>기본 능력치</h3>
          {stats.map((stat, index) => (
            <StatBar
              key={index}
              statName={stat.stat.name}
              statValue={stat.base_stat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeDetail;
