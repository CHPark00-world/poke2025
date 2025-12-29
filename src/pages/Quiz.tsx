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
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  const MAX_QUESTIONS = 10;

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
  }, [pokemons]);

  const handleClick = (pokemon: PokemonListItem) => {
    if (currentPokemon && pokemon.koreanName === currentPokemon.koreanName) {
      alert("정답!");
      setResult(true);
      setScore(score + 1);
    } else {
      alert(`틀렸어요! 정답은 ${currentPokemon?.koreanName}입니다.`);
      setResult(false);
    }
  };

  const handleNext = () => {
    const nextQuestion = questionCount + 1;
    setQuestionCount(nextQuestion);

    if (nextQuestion >= MAX_QUESTIONS) {
      setIsFinished(true);
    } else {
      newQuiz();
    }
  };

  const handleRestart = () => {
    setScore(0);
    setQuestionCount(0);
    setIsFinished(false);
    newQuiz();
  };

  if (isFinished) {
    return (
      <div className="result_container">
        <div className="result_box">
          <h2>🎉 퀴즈 완료! 🎉</h2>
          <p className="final_score">
            총 {MAX_QUESTIONS}문제 중<br />
            <strong>{score}개</strong>
            맞추셨습니다!
          </p>
          <p className="percentage">
            정답률: {((score / MAX_QUESTIONS) * 100).toFixed(1)}%
          </p>
          <div className="button_group">
            <button onClick={handleRestart} className="restart_btn">
              🔄 다시 도전하기
            </button>
            <button
              onClick={() => navigate(ROUTE.HOME)}
              className="back_btn_result"
            >
              🏠 홈으로 가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="Quiz">
      <button onClick={() => navigate(ROUTE.HOME)} className="back_btn">
        ← 뒤로가기
      </button>

      <div className="quiz_container">
        <div className="quiz_header">
          <h2>다음 포켓몬의 이름을 맞춰주세요!</h2>
          <div className="quiz_info">
            <span className="question_number">
              문제 {questionCount + 1} / {MAX_QUESTIONS}
            </span>
            <span className="current_score">✨ {score}개 맞춤</span>
          </div>
        </div>

        {currentPokemon ? (
          <>
            <img src={currentPokemon.detailImage} alt="포켓몬" />
            <div className="options">
              {options.map((pokemon, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(pokemon)}
                  disabled={result !== null}
                  className={result !== null ? "disabled" : ""}
                >
                  {pokemon.koreanName}
                </button>
              ))}
            </div>
            {result !== null && (
              <button className="next_btn" onClick={handleNext}>
                {questionCount + 1 >= MAX_QUESTIONS
                  ? "🎯 결과 보기"
                  : "다음 문제 →"}
              </button>
            )}
          </>
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </div>
  );
};
export default Quiz;
