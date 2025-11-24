import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ImageCacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();
  private maxCacheSize = 100;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.method !== 'GET' || !this.isImageRequest(req.url)) {
      return next.handle(req);
    }

    const cached = this.cache.get(req.url);
    if (cached) {
      return new Observable(subscriber => {
        subscriber.next(cached.clone());
        subscriber.complete();
      });
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && this.isImageResponse(event)) {
          this.addToCache(req.url, event.clone());
        }
      })
    );
  }

  /**
   * Vérifie si la requête est pour une image
   */
  private isImageRequest(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerUrl = url.toLowerCase();
    return (
      imageExtensions.some(ext => lowerUrl.includes(ext)) ||
      url.includes('/img/') ||
      url.includes('ui-avatars.com')
    );
  }

  /**
   * Vérifie si la réponse est une image
   */
  private isImageResponse(response: HttpResponse<any>): boolean {
    const contentType = response.headers.get('content-type') || '';
    return contentType.startsWith('image/');
  }

  /**
   * Ajoute la réponse au cache
   */
  private addToCache(url: string, response: HttpResponse<any>) {

    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(url, response);
  }

}
