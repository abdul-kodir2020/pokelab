import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pokedex } from '../shared/services/pokedex';
import { Pokemon } from '../shared/models/pokemon.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
})
export class PokedexComponent implements OnInit {
  pokemons$!: Observable<Pokemon[]>;

  constructor(private pokedex: Pokedex) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokedex.getUserPokemons();
  }

  trackById = (_: number, p: Pokemon) => p.id;
}
