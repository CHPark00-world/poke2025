import { useEffect, useRef, useState } from "react";
import "./pokeList.css";
import PokeListItem from "./pokeListItem";
import { PokemonListItem } from "../types/pokemon";

interface PokeListProps {
  pokemons: PokemonListItem[];
}

const ITEMS_PER_PAGE = 28;
const INITIAL_DISPLAY_COUNT = 28;
const SCROLL_THRESHOLD = 100;
const LOADING_DELAY = 300;

const PokeList = ({ pokemons }: PokeListProps) => {
  const [displayCount, setDisplayCount] = useState<number>(
    INITIAL_DISPLAY_COUNT,
  );
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const currentPokemons = pokemons.slice(0, displayCount);
  const hasMore = displayCount < pokemons.length;

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [pokemons]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (isLoadingRef.current) return;
          if (!hasMore) return;

          isLoadingRef.current = true;
          setLoading(true);

          setTimeout(() => {
            setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
            setLoading(false);
            isLoadingRef.current = false;
          }, LOADING_DELAY);
        }
      },
      {
        root: null,
        rootMargin: `${SCROLL_THRESHOLD}px`,
        threshold: 0,
      },
    );
    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }
    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  return (
    <div className="pokelist_container">
      <div className="pokelist">
        {currentPokemons.map((item) => {
          const id = item.url.split("/").filter(Boolean).pop();
          return <PokeListItem key={id} pokemon={item} />;
        })}
      </div>
      {hasMore && <div ref={sentinelRef} className="sentinel"></div>}
      {loading && <div className="loading_message">로딩 중 ... ⏳</div>}
      {!loading && displayCount < pokemons.length && (
        <div className="scroll_hint">스크롤을 내리면 더 보기...</div>
      )}
    </div>
  );
};

export default PokeList;
