import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pokedex } from '../../shared/services/pokedex';
import { Pokemon, PokemonType, EvolutionImage } from '../../shared/models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.html',
  styleUrls: ['./pokemon-detail.css'],
})
export class PokemonDetailComponent implements OnInit {
  private pokedex = inject(Pokedex);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pokemon: Pokemon | null = null;
  pokemonType: PokemonType | null = null;
  evolutionLine: EvolutionImage | null = null;
  types: PokemonType[] = [];
  evolutionLines: EvolutionImage[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    // Load all types and evolution lines
    this.pokedex.getTypes().subscribe(types => {
      this.types = types;
    });

    this.pokedex.getEvolutionLines().subscribe(lines => {
      this.evolutionLines = lines;
    });

    // Load pokemon details
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokedex.getById(id).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.pokemonType = this.types.find(t => t.id === pokemon.typeId) || null;
          this.evolutionLine = this.evolutionLines.find(el => el.id === pokemon.evolutionLineId) || null;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Impossible de charger les détails du Pokémon';
          this.loading = false;
          console.error(err);
        },
      });
    } else {
      this.error = 'ID du Pokémon manquant';
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(['/pokedex']);
  }

  editPokemon() {
    if (this.pokemon) {
      this.router.navigate(['/pokedex', this.pokemon.id, 'edit']);
    }
  }

  deletePokemon() {
    if (!this.pokemon) return;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${this.pokemon.name}" ?`)) return;

    this.pokedex.remove(this.pokemon.id).subscribe({
      next: () => {
        this.router.navigate(['/pokedex']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression');
      },
    });
  }

  getTypeColor(): string {
    return this.pokemonType?.color || '#888888';
  }

  getTypeIcon(): string {
    if (!this.pokemonType) return '';
    const typeName = this.pokemonType.name.toLowerCase();
    if (typeName === 'electrik') return 'icon/electric.svg';
    if (typeName === 'psy') return 'icon/psychic.svg';
    return `icon/${typeName}.svg`;
  }
}
