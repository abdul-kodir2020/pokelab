import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonName',
  standalone: true
})
export class PokemonNamePipe implements PipeTransform {
  /**
   * Transforme un nom de Pokemon en le capitalisant proprement
   * Exemple: "pikachu" -> "Pikachu"
   *          "charizard-mega" -> "Charizard Mega"
   */
  transform(value: string | null | undefined): string {
    if (!value) return '';
    
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
