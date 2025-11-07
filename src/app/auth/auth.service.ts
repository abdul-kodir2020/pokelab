import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de votre json-server
  private apiUrl = 'http://localhost:3000';
  
  // BehaviorSubject pour suivre l'état de l'utilisateur en temps réel
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    // Au démarrage, on vérifie si un utilisateur est déjà dans le localStorage
    const user = this.getLoggedInUser();
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Inscrit un nouvel utilisateur
   */
  register(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  /**
   * Tente de connecter un utilisateur
   * json-server filtre avec les query params
   */
  login(credentials: Pick<User, 'username' | 'password'>): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/users?username=${credentials.username}&password=${credentials.password}`
    );
  }

  /**
   * Gère la connexion réussie (appelé par les composants)
   */
  handleLogin(user: User): void {
    // Sauvegarde dans le localStorage
    localStorage.setItem('pokelab_user', JSON.stringify(user));
    // Met à jour le BehaviorSubject pour que le Header se mette à jour
    this.currentUserSubject.next(user);
    // Redirige vers la page principale
    this.router.navigate(['/pokedex']);
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    localStorage.removeItem('pokelab_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Vérifie si l'utilisateur est connecté (pour le AuthGuard)
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('pokelab_user');
  }

  /**
   * Récupère l'utilisateur depuis le localStorage
   */
  getLoggedInUser(): User | null {
    const user = localStorage.getItem('pokelab_user');
    return user ? JSON.parse(user) : null;
  }
}