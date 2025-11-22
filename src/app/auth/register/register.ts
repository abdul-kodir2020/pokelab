import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Logo } from '../../shared/components/logo/logo';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Logo],
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.errorMessage = null;
    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: (newUser) => {
        this.authService.handleLogin(newUser);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Une erreur est survenue lors de l\'inscription.';
      }
    });
  }
}