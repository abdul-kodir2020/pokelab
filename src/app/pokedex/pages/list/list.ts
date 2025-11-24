import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Pokedex } from '../../../shared/services/pokedex';
import { Pokemon, PokemonType } from '../../../shared/models/pokemon.model';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../../../shared/components/logo/logo';
import { PokedexListComponent } from '../../components/pokedex-list/pokedex-list';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, Logo, PokedexListComponent, SearchBarComponent],
  templateUrl: './list.html',
  styleUrls: ['./list.css'],
})
export class PokemonListComponent implements OnInit {
  private pokedex = inject(Pokedex);
  private authService = inject(AuthService);
  private router = inject(Router);

  pokemons$!: Observable<Pokemon[]>;
  displayedPokemons$!: Observable<Pokemon[]>;
  allPokemons: Pokemon[] = [];
  types: PokemonType[] = [];
  isLoggedIn = this.authService.isLoggedIn;
  currentUser$!: Observable<User | null>;
  activeFilters = {
    type: '',
    minLevel: 1
  };
  hasActiveFilter = false;
  showEmptyMessage = false;
  showFavoritesOnly = false;
  collectorMode = false;

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
    this.loadTypes();
    this.load();
    this.loadCollectorMode();
  }

  private loadCollectorMode() {
    const saved = localStorage.getItem('collectorMode');
    this.collectorMode = saved ? JSON.parse(saved) : false;
  }

  loadTypes() {
    this.pokedex.getTypes().subscribe(types => {
      this.types = types;
    });
  }

  load() {
    this.pokemons$ = this.pokedex.getUserPokemons();
    this.displayedPokemons$ = this.pokemons$;
    // Store all pokemons for filtering
    this.pokemons$.subscribe(pokemons => {
      this.allPokemons = pokemons;
    });
  }

  onFilterChange(filters: any) {
    this.activeFilters = filters;
    this.hasActiveFilter = filters.type !== '' || filters.minLevel > 1;
    
    this.applyFiltersAndFavorites();
  }

  resetFilters() {
    this.activeFilters = {
      type: '',
      minLevel: 1
    };
    this.hasActiveFilter = false;
    
    this.applyFiltersAndFavorites();
  }

  toggleFavoritesView() {
    this.showFavoritesOnly = !this.showFavoritesOnly;
    this.applyFiltersAndFavorites();
  }

  toggleCollectorMode() {
    this.collectorMode = !this.collectorMode;
    localStorage.setItem('collectorMode', JSON.stringify(this.collectorMode));
  }

  private applyFiltersAndFavorites() {
    let baseList = this.allPokemons;

    // Step 1: Apply favorites filter if active
    if (this.showFavoritesOnly) {
      baseList = baseList.filter(p => p.isFavorite);
    }

    // Step 2: Apply type and level filters
    if (this.hasActiveFilter) {
      baseList = baseList.filter(pokemon => {
        const typeMatch = this.activeFilters.type === '' || pokemon.typeId === this.activeFilters.type;
        const levelMatch = pokemon.level >= this.activeFilters.minLevel;
        return typeMatch && levelMatch;
      });
    }

    // Step 3: Update display
    if (baseList.length === 0) {
      this.showEmptyMessage = true;
      this.displayedPokemons$ = of([]);
    } else {
      this.showEmptyMessage = false;
      this.displayedPokemons$ = of(baseList);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
