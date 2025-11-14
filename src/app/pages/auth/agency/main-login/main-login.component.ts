import { Component, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseAuthComponent } from '../../base-auth.component';

@Component({
    selector: 'app-main-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './main-login.component.html',
    styleUrls: ['../../auth-layout.scss', './main-login.component.scss']
})
export class MainLoginComponent extends BaseAuthComponent {
    credentials = {
        email: '',
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
        if (!this.credentials.email || !this.credentials.password) {
            this.errorMessage = 'Please fill in all fields';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.credentials, 'main').subscribe({
            next: (success) => {
                this.isLoading = false;
                if (success) {
                    this.authService.redirectToUserDashboard();
                } else {
                    this.errorMessage = 'Invalid email or password';
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = 'Login failed. Please try again.';
                console.error('Login error:', error);
            }
        });
    }

    switchLoginType(type: 'influencer' | 'super-admin') {
        this.router.navigate(['/auth/login', type]);
    }
}