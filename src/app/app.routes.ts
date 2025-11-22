import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './shared/guards/auth.guard';
import { Home } from './pages/home/home';
import { PokemonListComponent } from './pokedex/pages/list/list';
import { PokemonFormComponent } from './pokedex/pages/form/form';
import { PokedexLayout } from './pokedex/components/pokedex-layout/pokedex-layout';
import { PokemonDetailComponent } from './pokedex/pages/detail/detail';


export const routes: Routes = [
  // Routes publiques
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Routes protégées
  
  {
    path: 'pokedex', 
    component: PokedexLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '', 
        component: PokemonListComponent
      },
      {
        path: 'creer', 
        component: PokemonFormComponent
      },
      {
        path: ':id',
        component: PokemonDetailComponent
      },
      {
        path: ':id/edit',
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