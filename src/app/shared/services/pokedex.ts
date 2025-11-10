import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { Pokemon, PokemonType } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class Pokedex {
  private base = 'http://localhost:3000/creatures';
  private typesUrl = 'http://localhost:3000/types';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getTypes(): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>(this.typesUrl);
  }

  createPokemon(data: {
    name: string;
    type1: string;
    hp: number;
    attack: number;
    imageUrl: string;
    shinyImageUrl?: string;
    level: number;
  }): Observable<Pokemon> {
    const rawUserId = this.auth.getLoggedInUser()?.id;
    if (!rawUserId) throw new Error('Utilisateur non connecté');

    const userId = typeof rawUserId === 'string' ? parseInt(rawUserId, 10) : rawUserId;

    const payload: Pokemon = {
      id: 0 as any,
      userId,
      name: data.name.trim(),
      type1: data.type1,
      hp: Number(data.hp),
      attack: Number(data.attack),
      imageUrl: data.imageUrl,
      shinyImageUrl: data.shinyImageUrl || '',
      isFavorite: false,
      level: Number(data.level),
      currentClicks: 0,
    };

    return this.http.post<Pokemon>(this.base, payload);
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
}
