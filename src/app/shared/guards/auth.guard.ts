import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

/**
 * Gardien fonctionnel pour protéger les routes.
 * Il vérifie si l'utilisateur est connecté.
 */
export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // L'utilisateur est connecté, on autorise l'accès
    return true;
  } else {
    // L'utilisateur n'est pas connecté, on le redirige vers /login
    // On retourne un UrlTree pour la redirection
    return router.createUrlTree(['/login']);
  }
};