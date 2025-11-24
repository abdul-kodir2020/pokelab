import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImageCacheInterceptor } from './shared/interceptors/image-cache.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Fournit le routeur avec vos routes
    provideRouter(routes),
    
    // 2. Fournit HttpClient avec cache interceptor
    provideHttpClient(),
    
    // 3. Ajouter l'interceptor de cache d'images
    { provide: HTTP_INTERCEPTORS, useClass: ImageCacheInterceptor, multi: true },

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};