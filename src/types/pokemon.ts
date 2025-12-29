export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

export interface QuizOption {
  id: number;
  name: string;
  isCorrect: boolean;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  koreanName: string;
  englishName: string;
  detailImage: string;
  pokemonId: number;
  description: string;
  url?: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
  koreanName: string;
  detailImage: string;
}
