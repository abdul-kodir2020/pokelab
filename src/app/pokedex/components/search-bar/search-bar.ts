import { Component, Input, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Pokedex } from '../../../shared/services/pokedex';
import { Pokemon, PokemonType } from '../../../shared/models/pokemon.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
})
export class SearchBarComponent implements OnInit {
  @Input() types: PokemonType[] = [];
  @Input() onFilterChange?: (filters: any) => void;
  
  private pokedex = inject(Pokedex);
  private router = inject(Router);

  // Search properties
  searchQuery = '';
  searchResults: Pokemon[] = [];
  allPokemons: Pokemon[] = [];
  showResults = false;

  // Filter properties
  showFilterMenu = false;
  selectedType = '';
  minLevel = 1;
  hasActiveFilter = false;
  
  // Filter state
  activeFilters = {
    type: '',
    minLevel: 1
  };

  ngOnInit() {
    // Load all pokemons for search
    this.pokedex.getUserPokemons().subscribe(pokemons => {
      this.allPokemons = pokemons;
    });
  }

  onSearchInput(query: string) {
    this.searchQuery = query;
    
    if (query.trim().length === 0) {
      this.searchResults = [];
      this.showResults = false;
      return;
    }

    // Filter pokemons that match the search query (case-insensitive)
    const filtered = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    // Limit to 5 results
    this.searchResults = filtered.slice(0, 5);
    this.showResults = this.searchResults.length > 0;
  }

  selectPokemon(pokemon: Pokemon) {
    // Navigate to pokemon detail page
    this.router.navigate(['/pokedex', pokemon.id]);
    // Clear search
    this.resetSearch();
  }

  resetSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showResults = false;
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
    // Clear search when opening filter
    if (this.showFilterMenu && this.searchQuery) {
      this.resetSearch();
    }
  }

  applyFilter() {
    this.activeFilters = {
      type: this.selectedType,
      minLevel: this.minLevel
    };
    
    this.hasActiveFilter = this.selectedType !== '' || this.minLevel > 1;
    this.showFilterMenu = false;
    
    // Emit filter change event
    if (this.onFilterChange) {
      this.onFilterChange(this.activeFilters);
    }
  }

  resetFilter() {
    this.selectedType = '';
    this.minLevel = 1;
    this.activeFilters = {
      type: '',
      minLevel: 1
    };
    this.hasActiveFilter = false;
    this.showFilterMenu = false;
    
    // Emit filter reset
    if (this.onFilterChange) {
      this.onFilterChange(this.activeFilters);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close results when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showResults = false;
    }
    // Close filter menu when clicking outside
    if (!target.closest('.filter-wrapper')) {
      this.showFilterMenu = false;
    }
  }

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
}
