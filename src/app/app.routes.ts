import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './shared/guards/auth.guard';
import { Home } from './home/home';
import { Pokedex } from './pokedex/pokedex';

export const routes: Routes = [
  // Routes publiques
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Routes protégées par le AuthGuard
  // Décommentez-les lorsque vos composants seront créés
  
  { 
    path: 'pokedex', 
    component: Pokedex, 
    canActivate: [authGuard] 
  },
  /*
  { 
    path: 'creer', 
    component: CreateCreatureComponent, 
    canActivate: [authGuard] 
  },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }