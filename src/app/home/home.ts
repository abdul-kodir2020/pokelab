import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Logo } from '../components/logo/logo';

@Component({
  selector: 'app-home',
  imports: [RouterModule, Logo],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  activeColumn: string = 'col1';
}
