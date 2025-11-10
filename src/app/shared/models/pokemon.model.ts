export interface Pokemon {
    id: number;
    userId: number;
    name: string;
    type1: string;
    hp: number;
    attack: number;
    imageUrl: string;
    shinyImageUrl: string;
    isFavorite: boolean;
    level: number;
    currentClicks: number;
}

export type CreatePokemon = Omit<Pokemon, 'id' | 'userId' | 'isFavorite' | 'currentClicks'>;

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