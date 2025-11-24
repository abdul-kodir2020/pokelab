import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {
  private cache = new Map<string, Blob>();
  private requests = new Map<string, Observable<Blob>>();
  private maxCacheSize = 50 * 1024 * 1024; // 50MB max
  private currentSize = 0;

  constructor(private http: HttpClient) {
    this.loadCacheFromStorage();
  }

  /**
   * Récupère une image du cache ou de la requête HTTP
   */
  getImage(url: string): Observable<Blob> {
    // Si déjà en cache, retourner immédiatement
    if (this.cache.has(url)) {
      return of(this.cache.get(url)!);
    }

    // Si la requête est déjà en cours, retourner l'observable existant
    if (this.requests.has(url)) {
      return this.requests.get(url)!;
    }

    // Faire la requête et cacher le résultat
    const request$ = this.http.get(url, { responseType: 'blob' }).pipe(
      tap(blob => {
        this.addToCache(url, blob);
        this.requests.delete(url);
      }),
      catchError(error => {
        this.requests.delete(url);
        throw error;
      }),
      shareReplay(1)
    );

    this.requests.set(url, request$);
    return request$;
  }

  /**
   * Ajoute une image au cache avec gestion de la taille
   */
  private addToCache(url: string, blob: Blob) {
    const blobSize = blob.size;

    // Vérifier la limite de taille
    if (this.currentSize + blobSize > this.maxCacheSize) {
      this.evictOldest();
    }

    this.cache.set(url, blob);
    this.currentSize += blobSize;
  }

  /**
   * Supprime l'élément le plus ancien du cache (FIFO)
   */
  private evictOldest() {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      const blob = this.cache.get(firstKey);
      if (blob) {
        this.currentSize -= blob.size;
      }
      this.cache.delete(firstKey);
    }
  }

  /**
   * Vide complètement le cache
   */
  clearCache() {
    this.cache.clear();
    this.requests.clear();
    this.currentSize = 0;
    localStorage.removeItem('imageCache');
  }

  /**
   * Retourne le nombre d'images en cache
   */
  getCacheSize(): number {
    return this.cache.size;
  }

  /**
   * Retourne la taille totale en cache (en MB)
   */
  getCacheSizeInMB(): number {
    return Math.round((this.currentSize / 1024 / 1024) * 100) / 100;
  }

  /**
   * Sauvegarde le cache dans le localStorage
   */
  private loadCacheFromStorage() {
    try {
      const cached = localStorage.getItem('imageCache');
      if (cached) {
        const data = JSON.parse(cached);
        this.currentSize = data.size || 0;
      }
    } catch (error) {
      console.warn('Impossible de charger le cache depuis localStorage', error);
    }
  }

  /**
   * Précharge une liste d'images
   */
  preloadImages(urls: string[]): Observable<Blob[]> {
    const observables = urls.map(url => this.getImage(url));
    return new Observable(subscriber => {
      let completed = 0;
      const results: Blob[] = [];

      if (observables.length === 0) {
        subscriber.next([]);
        subscriber.complete();
        return;
      }

      observables.forEach((obs, index) => {
        obs.subscribe(
          blob => {
            results[index] = blob;
            completed++;
            if (completed === observables.length) {
              subscriber.next(results);
              subscriber.complete();
            }
          },
          error => subscriber.error(error)
        );
      });
    });
  }
}
