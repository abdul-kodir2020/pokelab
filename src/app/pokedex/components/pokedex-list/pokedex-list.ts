import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pokemon, PokemonType } from '../../../shared/models/pokemon.model';
import { RouterModule } from '@angular/router';
import { Pokedex } from '../../../shared/services/pokedex';
import { PokemonNamePipe } from '../../../shared/pipes/pokemon-name.pipe';
import { FavoriteStarDirective } from '../../../shared/directives/favorite-star.directive';

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PokemonNamePipe, FavoriteStarDirective],
  templateUrl: './pokedex-list.html',
  styleUrls: ['./pokedex-list.css'],
})
export class PokedexListComponent implements OnInit {
  @Input() pokemons$!: Observable<Pokemon[]>;
  @Input() types: PokemonType[] = [];
  @Input() collectorMode = false;

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

  getCollectorBackground(typeId: string): { [key: string]: string } {
    if (!this.collectorMode) return {};
    
    const type = this.getTypeById(typeId);
    if (!type) return {};
    
    const typeName = type.name.toLowerCase();
    const backgroundMap: { [key: string]: { image: string; position: string } } = {
      'roche': { image: '2151128015.jpg', position: 'left' },
      'plante': { image: 'abstract-green-painting-background-design.jpg', position: 'center' },
      'feu': { image: 'galaxy-background-illustration.jpg', position: 'center' },
      'electrik': { image: 'thunderstorm-illustration-digital-art-style.jpg', position: 'center' },
      'eau': { image: 'paysage-cotier-dans-le-style-fantastique.jpg', position: 'center' },
      'psy': { image: 'beautiful-clouds-digital-art.jpg', position: 'center' }
    };

    const bg = backgroundMap[typeName];
    if (bg) {
      return {
        'backgroundImage': `url('/img/${bg.image}')`,
        'backgroundPosition': bg.position
      };
    }
    return {};
  }

  getCollectorTextColor(typeId: string): string {
    if (!this.collectorMode) return '';
    
    const type = this.getTypeById(typeId);
    if (!type) return '';
    
    const typeName = type.name.toLowerCase();
    const colorMap: { [key: string]: string } = {
      'roche': '#ffffffff',
      'plante': '#ffffff',
      'feu': '#ffffffff',
      'electrik': '#ffffffff',
      'eau': '#ffffff',
      'psy': '#000000ff'          
    };

    return colorMap[typeName] || '';
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
