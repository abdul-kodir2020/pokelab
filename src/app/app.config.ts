import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Fournit le routeur avec vos routes
    provideRouter(routes),
    
    // 2. Fournit HttpClient (ceci corrige votre erreur NG0201)
    provideHttpClient(),

    provideBrowserGlobalErrorListeners(),

    provideZoneChangeDetection({ eventCoalescing: true }),
  ]
};