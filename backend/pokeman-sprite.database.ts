/**
 * Interface pour nos données de sprite statiques.
 */
export interface SpriteData {
  id: number;
  name: string;
  imageUrl: string;
  shinyImageUrl: string;
}

/**
 * Votre base de données "en dur" de sprites.
 * J'ai mis les 25 premiers, vous pouvez continuer jusqu'à 50 !
 * J'ai mis les 50 premiers !
 */
export const POKEMON_SPRITES: SpriteData[] = [
    {
        id: 1,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/regular.png",
        name: "Bulbizarre",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/1/shiny.png"
    }, 
    {
        id: 2,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/2/regular.png",
        name: "Herbizarre",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/2/shiny.png"
    }, 
    {
        id: 3,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/3/regular.png",
        name: "Florizarre",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/3/shiny.png"
    }, 
    {
        id: 4,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/4/regular.png",
        name: "Salamèche",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/4/shiny.png"
    }, 
    {
        id: 5,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/5/regular.png",
        name: "Reptincel",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/5/shiny.png"
    }, 
    {
        id: 6,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/6/regular.png",
        name: "Dracaufeu",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/6/shiny.png"
    }, 
    {
        id: 7,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/7/regular.png",
        name: "Carapuce",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/7/shiny.png"
    }, 
    {
        id: 8,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/8/regular.png",
        name: "Carabaffe",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/8/shiny.png"
    }, 
    {
        id: 9,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/9/regular.png",
        name: "Tortank",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/9/shiny.png"
    }, 
    {
        id: 10,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/10/regular.png",
        name: "Chenipan",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/10/shiny.png"
    }, 
    {
        id: 11,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/11/regular.png",
        name: "Chrysacier",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/11/shiny.png"
    }, 
    {
        id: 12,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/12/regular.png",
        name: "Papilusion",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/12/shiny.png"
    }, 
    {
        id: 13,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/13/regular.png",
        name: "Aspicot",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/13/shiny.png"
    }, 
    {
        id: 14,
        imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/14/regular.png",
        name: "Coconfort",
        shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/14/shiny.png"
    }, 
    {
    id: 15,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/15/regular.png",
    name: "Dardargnan",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/15/shiny.png"
    }, 
    {
    id: 16,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/16/regular.png",
    name: "Roucool",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/16/shiny.png"
    }, 
    {
    id: 17,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/17/regular.png",
    name: "Roucoups",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/17/shiny.png"
    }, 
    {
    id: 18,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/18/regular.png",
    name: "Roucarnage",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/18/shiny.png"
    }, 
    {
    id: 19,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/19/regular.png",
    name: "Rattata",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/19/shiny.png"
    }, 
    {
    id: 20,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/20/regular.png",
    name: "Rattatac",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/20/shiny.png"
    }, 
    {
    id: 21,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/21/regular.png",
    name: "Piafabec",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/21/shiny.png"
    }, 
    {
    id: 22,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/22/regular.png",
    name: "Rapasdepic",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/22/shiny.png"
    }, 
    {
    id: 23,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/23/regular.png",
    name: "Abo",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/23/shiny.png"
    }, 
    {
    id: 24,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/24/regular.png",
    name: "Arbok",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/24/shiny.png"
    }, 
    {
    id: 25,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/25/regular.png",
    name: "Pikachu",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/25/shiny.png"
    }, 
    {
    id: 26,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/26/regular.png",
    name: "Raichu",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/26/shiny.png"
    }, 
    {
    id: 27,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/27/regular.png",
    name: "Sabelette",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/27/shiny.png"
    }, 
    {
    id: 28,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/28/regular.png",
    name: "Sablaireau",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/28/shiny.png"
    }, 
    {
    id: 29,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/29/regular.png",
    name: "Nidoran♀",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/29/shiny.png"
    }, 
    {
    id: 30,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/30/regular.png",
    name: "Nidorina",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/30/shiny.png"
    }, 
    {
    id: 31,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/31/regular.png",
    name: "Nidoqueen",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/31/shiny.png"
    }, 
    {
    id: 32,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/32/regular.png",
    name: "Nidoran♂",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/32/shiny.png"
    }, 
    {
    id: 33,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/33/regular.png",
    name: "Nidorino",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/33/shiny.png"
    }, 
    {
    id: 34,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/34/regular.png",
    name: "Nidoking",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/34/shiny.png"
    }, 
    {
    id: 35,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/35/regular.png",
    name: "Mélofée",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/35/shiny.png"
    }, 
    {
    id: 36,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/36/regular.png",
    name: "Mélodelfe",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/36/shiny.png"
    }, 
    {
    id: 37,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/37/regular.png",
    name: "Goupix",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/37/shiny.png"
    }, 
    {
    id: 38,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/38/regular.png",
    name: "Feunard",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/38/shiny.png"
    }, 
    {
    id: 39,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/39/regular.png",
    name: "Rondoudou",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/39/shiny.png"
    }, 
    {
    id: 40,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/40/regular.png",
    name: "Grodoudou",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/40/shiny.png"
    }, 
    {
    id: 41,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/41/regular.png",
    name: "Nosferapti",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/41/shiny.png"
    }, 
    {
    id: 42,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/42/regular.png",
    name: "Nosferalto",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/42/shiny.png"
    }, 
    {
    id: 43,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/43/regular.png",
    name: "Mystherbe",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/43/shiny.png"
    }, 
    {
    id: 44,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/44/regular.png",
    name: "Ortide",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/44/shiny.png"
    }, 
    {
    id: 45,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/45/regular.png",
    name: "Rafflesia",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/45/shiny.png"
    }, 
    {
    id: 46,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/46/regular.png",
    name: "Paras",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/46/shiny.png"
    }, 
    {
    id: 47,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/47/regular.png",
    name: "Parasect",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/47/shiny.png"
    }, 
    {
    id: 48,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/48/regular.png",
    name: "Mimitoss",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/48/shiny.png"
    }, 
    {
    id: 49,
    imageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/49/regular.png",
    name: "Aéromite",
    shinyImageUrl: "https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/49/shiny.png"
    }
];