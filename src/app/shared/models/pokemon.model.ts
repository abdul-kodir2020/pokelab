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