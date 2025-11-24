import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Logo } from '../../shared/components/logo/logo';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Logo],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  activeColumn: string = 'col1';
  isLoggedIn = this.authService.isLoggedIn;
  currentUser$!: Observable<User | null>;

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}
