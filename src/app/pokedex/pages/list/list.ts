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
  activeFilters = {
    type: '',
    minLevel: 1
  };
  hasActiveFilter = false;
  filteredPokemons: Pokemon[] = [];
  showFilteredList = false;
  showEmptyMessage = false;

  ngOnInit(): void {
    this.loadTypes();
    this.load();
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
    
    if (this.hasActiveFilter) {
      // Apply filters
      this.filteredPokemons = this.allPokemons.filter(pokemon => {
        const typeMatch = filters.type === '' || pokemon.typeId === filters.type;
        const levelMatch = pokemon.level >= filters.minLevel;
        return typeMatch && levelMatch;
      });
      
      if (this.filteredPokemons.length === 0) {
        this.showEmptyMessage = true;
        this.showFilteredList = false;
      } else {
        this.displayedPokemons$ = of(this.filteredPokemons);
        this.showFilteredList = true;
        this.showEmptyMessage = false;
      }
    } else {
      // Reset to show all
      this.displayedPokemons$ = this.pokemons$;
      this.showFilteredList = false;
      this.showEmptyMessage = false;
    }
  }

  resetFilters() {
    this.activeFilters = {
      type: '',
      minLevel: 1
    };
    this.hasActiveFilter = false;
    this.showFilteredList = false;
    this.showEmptyMessage = false;
    this.displayedPokemons$ = this.pokemons$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
