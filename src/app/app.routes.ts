import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './shared/guards/auth.guard';
import { Home } from './home/home';
import { PokedexComponent } from './pokedex/pokedex';
import { PokemonFormComponent } from './pokedex-form/pokedex-form';
import { PokedexLayout } from './pokedex-layout/pokedex-layout';


export const routes: Routes = [
  // Routes publiques
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Routes protégées par le AuthGuard
  // Décommentez-les lorsque vos composants seront créés
  
  {
    path: 'pokedex', 
    component: PokedexLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '', 
        component: PokedexComponent
      },
      {
        path: 'creer', 
        component: PokemonFormComponent
      }
    ]
  },
  // { 
  //   path: 'pokedex', 
  //   component: PokedexComponent, 
  //   canActivate: [authGuard] 
  // },

  // { 
  //   path: 'pokedex/creer', 
  //   component: PokemonFormComponent, 
  //   canActivate: [authGuard] 
  // },
  // { 
  //   path: 'creatures/:id/edit',
  //   component: PokemonFormComponent,
  //   canActivate: [authGuard]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }