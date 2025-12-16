import "./pokeCard.css";
import { useNavigate } from "react-router-dom";
import TYPE from "../constants/type";
import STAT from "../constants/stat";
import StatBar from "./statBar";

const PokeItem = ({ pokemon }) => {
  const navigate = useNavigate();
  const stats = pokemon.stats;

  const handleClick = () => {
    if (!pokemon.url) return;
    const id = pokemon.url.split("/")[6];
    navigate(`/detail/${id}`);
  };

  return (
    <div className="detail_container">
      <button onClick={() => navigate("/home")} className="back_btn">
        ← 뒤로가기
      </button>
      <div onClick={handleClick} className="PokeCard">
        <div className="info_section">
          <div className="top_row">
            <div className="image_section">
              <img src={pokemon.detailImage} />
              <span>#{pokemon.pokemonId}</span>
            </div>
            <div className="name_section">
              <h1 className="korean-name">{pokemon.koreanName}</h1>
              <h4 className="english-name">{pokemon.englishName}</h4>
              <div className="type-info">
                {pokemon.types?.map((types, index) => (
                  <span key={index}>{TYPE[types.type.name]}</span>
                ))}
              </div>
              <p className="description">{pokemon.description}</p>
              <div className="size_section">
                <span>키 : {pokemon.height}m</span>
                <span>몸무게 : {pokemon.weight}kg</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ability_section">
          <h3>기본 능력치 </h3>
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

export default PokeItem;
