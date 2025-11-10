import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { CreatePokemon, Pokemon, PokemonType } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class Pokedex {
  private base = 'http://localhost:3000/creatures';
  private typesUrl = 'http://localhost:3000/types';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getTypes(): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(this.typesUrl);
  }

  createPokemon(data: CreatePokemon): Observable<Pokemon> {
    const rawUserId = this.auth.getLoggedInUser()?.id;
    if (!rawUserId) throw new Error('Utilisateur non connecté');

    const userId = typeof rawUserId === 'string' ? parseInt(rawUserId, 10) : rawUserId;

    const body = {
      ...data,
      userId,
      isFavorite: false,
      currentClicks: 0,
    };

    return this.http.post<Pokemon>(this.base, body);
  }

  getUserPokemons(): Observable<Pokemon[]> {
    const rawUserId = this.auth.getLoggedInUser()?.id;
    if (!rawUserId) throw new Error('Utilisateur non connecté');
    const userId = typeof rawUserId === 'string' ? parseInt(rawUserId, 10) : rawUserId;
    return this.http.get<Pokemon[]>(`${this.base}?userId=${userId}`);
  }

  getById(id: number | string) {
    return this.http.get<Pokemon>(`${this.base}/${id}`);
  }

  update(id: number | string, partial: Partial<Pokemon>) {
    return this.http.patch<Pokemon>(`${this.base}/${id}`, partial);
  }

  remove(id: number | string) {
    return this.http.delete(`${this.base}/${id}`);
  }

}
