import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pokedex } from '../../../shared/services/pokedex';
import { Pokemon, PokemonType, EvolutionImage } from '../../../shared/models/pokemon.model';
import { DetailEvolutionComponent } from './detail-evolution/detail-evolution';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DetailEvolutionComponent],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css'],
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
  levelUpAnimation = false;
  showEvolutionModal = false;
  evolutionBeforeImage = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'ID du Pokémon manquant';
      this.loading = false;
      return;
    }

    // Load types and evolution lines first, then load pokemon
    Promise.all([
      this.pokedex.getTypes().toPromise(),
      this.pokedex.getEvolutionLines().toPromise()
    ]).then(([types, lines]) => {
      this.types = types || [];
      this.evolutionLines = lines || [];
      
      // Now load pokemon details with types and evolution lines ready
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
    }).catch((err) => {
      this.error = 'Impossible de charger les données';
      this.loading = false;
      console.error(err);
    });
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

  toggleFavorite() {
    if (!this.pokemon) return;
    this.pokemon.isFavorite = !this.pokemon.isFavorite;
    this.pokedex.update(this.pokemon.id, { isFavorite: this.pokemon.isFavorite }).subscribe({
      error: (err) => {
        console.error('Erreur lors de la mise à jour du favori', err);
        this.pokemon!.isFavorite = !this.pokemon!.isFavorite; // Revert
      },
    });
  }

  trainPokemon() {
    if (!this.pokemon) return;
    this.pokemon.currentClicks++;
    
    // Check if next level reached
    const clicksNeeded = this.getClicksForNextLevel();
    if (this.pokemon.currentClicks >= clicksNeeded) {
      this.pokemon.currentClicks = 0;
      this.pokemon.level++;
      
      // Trigger level up animation
      this.levelUpAnimation = true;
      setTimeout(() => {
        this.levelUpAnimation = false;
      }, 600);

      // Update HP and Attack based on level up
      if (this.pokemonType) {
        this.pokemon.hp = this.pokemonType.baseHp + (this.pokemon.level - 1) * this.pokemonType.growthHp;
        this.pokemon.attack = this.pokemonType.baseAttack + (this.pokemon.level - 1) * this.pokemonType.growthAttack;
      }

      // Check for evolution
      this.checkEvolution();
    }

    this.pokedex.update(this.pokemon.id, {
      currentClicks: this.pokemon.currentClicks,
      level: this.pokemon.level,
      hp: this.pokemon.hp,
      attack: this.pokemon.attack,
      imageUrl: this.pokemon.imageUrl,
    }).subscribe({
      error: (err) => {
        console.error('Erreur lors de l\'entraînement', err);
      },
    });
  }

  private checkEvolution() {
    if (!this.pokemon || !this.evolutionLine) return;

    // Evolution logic based on level
    let newImageUrl = this.pokemon.imageUrl;
    let hasEvolved = false;

    if (this.pokemon.level >= 32 && this.evolutionLine.stage3) {
      if (this.pokemon.imageUrl !== this.evolutionLine.stage3) {
        this.evolutionBeforeImage = this.pokemon.imageUrl;
        newImageUrl = this.evolutionLine.stage3;
        hasEvolved = true;
      }
    } else if (this.pokemon.level >= 16 && this.evolutionLine.stage2) {
      if (this.pokemon.imageUrl !== this.evolutionLine.stage2) {
        this.evolutionBeforeImage = this.pokemon.imageUrl;
        newImageUrl = this.evolutionLine.stage2;
        hasEvolved = true;
      }
    } else if (this.pokemon.level >= 1 && this.evolutionLine.stage1) {
      if (this.pokemon.imageUrl !== this.evolutionLine.stage1) {
        this.evolutionBeforeImage = this.pokemon.imageUrl;
        newImageUrl = this.evolutionLine.stage1;
        hasEvolved = true;
      }
    }

    if (hasEvolved) {
      this.pokemon.imageUrl = newImageUrl;
      this.showEvolutionModal = true;
    }
  }

  closeEvolutionModal() {
    this.showEvolutionModal = false;
  }

  getClicksForNextLevel(): number {
    if (!this.pokemon) return 10;
    // Formula: 10 + (level - 1) * 1 = 10, 11, 12, 13, ...
    return 10 + (this.pokemon.level - 1);
  }

  getProgressPercentage(): number {
    if (!this.pokemon) return 0;
    const clicksNeeded = this.getClicksForNextLevel();
    return Math.round((this.pokemon.currentClicks / clicksNeeded) * 100);
  }
}