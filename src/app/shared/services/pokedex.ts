// pokedex.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';


@Injectable({ providedIn: 'root' })
export class Pokedex {
  private base = 'http://localhost:3000/creatures';

  constructor(private http: HttpClient, private auth: AuthService) {}

  createPokemon(creature: { name: string; type: string }): Observable<Pokemon> {
    const userId = this.auth.getLoggedInUser()?.id;
    if (!userId) throw new Error('Utilisateur non connecté');
    return this.http.post<Pokemon>(this.base, { ...creature, userId });
  }

  getUserPokemons(): Observable<Pokemon[]> {
    const userId = this.auth.getLoggedInUser()?.id;
    if (!userId) throw new Error('Utilisateur non connecté');
    return this.http.get<Pokemon[]>(`${this.base}?userId=${userId}`);
  }
}
