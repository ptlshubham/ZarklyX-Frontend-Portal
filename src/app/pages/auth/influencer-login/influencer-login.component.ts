import { Component, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { BaseAuthComponent } from '../base-auth.component';

@Component({
  selector: 'app-influencer-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['../auth-layout.scss'],
  template: `
    <div class="auth-page-bg">
      <div class="auth-card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div class="auth-content space-y-8">
        <!-- Logo and Header -->
        <div>
          <div class="mx-auto h-16 w-auto flex justify-center">
            <div class="h-16 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Influencer Portal
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Create, inspire, and grow your audience
          </p>
        </div>
        
        <!-- Login Form -->
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <!-- Error Message -->
          <div *ngIf="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-700">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Input Fields -->
          <div class="space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Username or Email</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                autocomplete="username" 
                required 
                class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors" 
                placeholder="Enter your username or email"
                [(ngModel)]="credentials.username">
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required 
                class="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm transition-colors" 
                placeholder="Enter your password"
                [(ngModel)]="credentials.password">
            </div>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button 
              type="submit" 
              [disabled]="isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
              <span *ngIf="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <svg *ngIf="!isLoading" class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              {{ isLoading ? 'Signing in...' : 'Sign in as Influencer' }}
            </button>
          </div>

          <!-- Navigation Links -->
          <div class="mt-6 text-center space-y-3">
            <button 
              type="button"
              (click)="backToMain()"
              class="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to main login
            </button>
            <div>
              <button 
                type="button"
                (click)="switchToSuperAdmin()"
                class="text-sm text-purple-600 hover:text-purple-500 transition-colors inline-flex items-center">
                Super Admin Login
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
        
        <!-- Features for Influencers -->
        <div class="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <h3 class="text-sm font-medium text-gray-900 mb-3 flex items-center">
            <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Influencer Features:
          </h3>
          <ul class="text-sm text-gray-600 space-y-2">
            <li class="flex items-center">
              <svg class="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Content Management Studio
            </li>
            <li class="flex items-center">
              <svg class="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Advanced Analytics Dashboard
            </li>
            <li class="flex items-center">
              <svg class="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Campaign &amp; Brand Partnerships
            </li>
            <li class="flex items-center">
              <svg class="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Earnings &amp; Performance Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Custom animations */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
      50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    /* Custom focus styles */
    input:focus {
      transform: translateY(-1px);
      box-shadow: 0 4px 20px rgba(168, 85, 247, 0.2);
    }
    
    /* Button hover effects */
    button:hover {
      transform: translateY(-1px);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    /* Gradient text effect */
    .gradient-text {
      background: linear-gradient(45deg, #8B5CF6, #EC4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `]
})
export class InfluencerLoginComponent extends BaseAuthComponent {
  credentials = {
    username: '',
    password: ''
  };
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document
  ) {
    super(renderer, document);
  }

  onSubmit() {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.credentials, 'influencer').subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.authService.redirectToUserDashboard();
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
        console.error('Login error:', error);
      }
    });
  }

  backToMain() {
    this.router.navigate(['/auth/login']);
  }

  switchToSuperAdmin() {
    this.router.navigate(['/auth/login/super-admin']);
  }
}