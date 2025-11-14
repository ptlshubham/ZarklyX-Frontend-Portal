import { Component, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseAuthComponent } from '../../base-auth.component';

@Component({
  selector: 'app-super-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['../../auth-layout.scss', './super-admin-login.component.scss'],
  templateUrl: './super-admin-login.component.html'
})
export class SuperAdminLoginComponent extends BaseAuthComponent {
  credentials = {
    adminId: '',
    password: '',
    securityCode: ''
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
    if (!this.credentials.adminId || !this.credentials.password || !this.credentials.securityCode) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials, 'super-admin').subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.authService.redirectToUserDashboard();
        } else {
          this.errorMessage = 'Invalid credentials or security code';
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

  switchToInfluencer(type: 'influencer' | 'super-admin') {
    this.router.navigate(['/auth/login/', type]);
  }
}