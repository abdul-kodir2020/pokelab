import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Pokedex } from '../shared/services/pokedex';
import { Pokemon, PokemonType } from '../shared/models/pokemon.model';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../components/logo/logo';
import { PokedexListComponent } from '../components/pokedex-list/pokedex-list';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, RouterModule, Logo, PokedexListComponent],
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.css'],
})
export class PokedexComponent implements OnInit {
  private pokedex = inject(Pokedex);
  private authService = inject(AuthService);
  private router = inject(Router);

  pokemons$!: Observable<Pokemon[]>;
  types: PokemonType[] = [];
  isLoggedIn = this.authService.isLoggedIn;

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
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
