import { useEffect, useState } from "react";
import { PokemonDetail } from "../types/pokemon";

const base_url = import.meta.env.VITE_API_BASE_URL;

const usePokemon = (id: number) => {
  const [pokemon, setPokemon] = useState<PokemonDetail | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getPokemonDetail = async () => {
      try {
        setLoading(true); // 🟢 로딩 시작
        setError(null); // 🟢 에러 초기화

        const [detailRes, speciesRes] = await Promise.all([
          fetch(`${base_url}/pokemon/${id}`),
          fetch(`${base_url}/pokemon-species/${id}`),
        ]);

        // 🟢 HTTP 상태 코드 체크
        if (!detailRes.ok || !speciesRes.ok) {
          throw new Error("포켓몬 정보를 불러올 수 없습니다.");
        }

        const detailData = await detailRes.json();
        const speciesData = await speciesRes.json();

        // 🟢 언마운트 체크
        if (cancelled) return;

        const koreanName = speciesData.names[2].name;
        const englishName = detailData.name;
        const detailImage = detailData.sprites.other.dream_world.front_default;
        const pokemonId = detailData.id;
        const types = detailData.types;
        const height = detailData.height / 10;
        const weight = detailData.weight / 10;
        const description = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === "ko",
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
      } catch (err) {
        // 🟢 에러 상태 설정
        if (!cancelled) {
          console.error("에러: ", err);
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        // 🟢 로딩 종료
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getPokemonDetail();

    // 🟢 클린업 함수
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { pokemon, loading, error };
};

export default usePokemon;
