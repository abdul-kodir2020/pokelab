import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pokemon, PokemonType } from '../../../shared/models/pokemon.model';
import { RouterModule } from '@angular/router';
import { Pokedex } from '../../../shared/services/pokedex';
import { PokemonNamePipe } from '../../../shared/pipes/pokemon-name.pipe';
import { FavoriteDirective } from '../../../shared/directives/favorite.directive';

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PokemonNamePipe, FavoriteDirective],
  templateUrl: './pokedex-list.html',
  styleUrls: ['./pokedex-list.css'],
})
export class PokedexListComponent implements OnInit {
  @Input() pokemons$!: Observable<Pokemon[]>;
  @Input() types: PokemonType[] = [];

  private pokedex = inject(Pokedex);

  ngOnInit(): void {
    // Component lifecycle management
  }

  trackById = (_: number, p: Pokemon) => p.id;

  getTypeById(typeId: string): PokemonType | undefined {
    return this.types.find(t => t.id === typeId);
  }

  getTypeColor(typeId: string): string {
    const type = this.getTypeById(typeId);
    return type?.color || '#888888';
  }

  getTypeIcon(typeId: string): string {
    const type = this.getTypeById(typeId);
    if (!type) return '';
    const typeName = type.name.toLowerCase();
    if (typeName === 'electrik') return 'icon/electric.svg';
    if (typeName === 'psy') return 'icon/psychic.svg';
    return `icon/${typeName}.svg`;
  }

  onDelete(p: Pokemon, ev?: Event) {
    ev?.preventDefault();
    ev?.stopPropagation();
    if (!confirm(`Supprimer "${p.name}" ?`)) return;

    this.pokedex.remove(p.id).subscribe({
      next: () => {
        // Reload triggered by parent component
      },
      error: (e) => {
        console.error(e);
        alert('Suppression impossible (voir console).');
      },
    });
  }
}
