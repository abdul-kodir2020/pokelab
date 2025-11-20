export interface Pokemon {
  id: string;
  userId: string;
  name: string;
  typeId: string;
  evolutionLineId: string;
  hp: number;
  attack: number;
  imageUrl: string;
  isFavorite: boolean;
  level: number;
  currentClicks: number;
}

export interface CreatePokemon {
  name: string;
  typeId: string;
  evolutionLineId: string;
  hp: number;
  attack: number;
  level: number;
  imageUrl: string;
}

export interface PokemonType {
  id: string;
  name: string;
  color: string;
  baseHp: number;
  baseAttack: number;
  growthHp: number;
  growthAttack: number;
  weaknesses: string[];
}

export interface EvolutionImage {
  id: string;
  stage1: string;
  stage2: string;
  stage3: string;
}