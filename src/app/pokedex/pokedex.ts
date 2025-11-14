import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pokedex } from '../shared/services/pokedex';
import { Pokemon } from '../shared/models/pokemon.model';
import { RouterModule } from '@angular/router';
import { Logo } from '../components/logo/logo';
import { PokemonList } from '../components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, Logo, PokemonList],
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
})
export class PokedexComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;

  constructor(private pokedex: Pokedex) {}

  ngOnInit(): void {
    this.load();
  }

  load() { this.pokemons$ = this.pokedex.getUserPokemons(); }

  trackById = (_: number, p: Pokemon) => p.id;

  onDelete(p: Pokemon, ev?: Event) {
    ev?.preventDefault();
    ev?.stopPropagation();
    if (!confirm(`Supprimer "${p.name}" ?`)) return;

    this.pokedex.remove(p.id).subscribe({
      next: () => {
        this.load();
        // toast/alert si tu veux
      },
      error: (e) => {
        console.error(e);
        alert('Suppression impossible (voir console).');
      },
    });
  }
}
