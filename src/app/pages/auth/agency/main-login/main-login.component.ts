import { Component, Renderer2, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseAuthComponent } from '../../base-auth.component';

@Component({
    selector: 'app-main-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './main-login.component.html',
    styleUrls: ['../../auth-layout.scss', './main-login.component.scss']
})
export class MainLoginComponent extends BaseAuthComponent {
    loginForm!: FormGroup;
    submitted = false;
    isLoading = false;
    errorMessage = '';
    fieldTextType = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        renderer: Renderer2,
        @Inject(DOCUMENT) document: Document
    ) {
        super(renderer, document);
        this.initializeForm();
    }

    private initializeForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['user@example.com', [Validators.required, Validators.email]],
            password: ['password', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        const credentials = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.authService.login(credentials, 'main').subscribe({
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

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    switchLoginType(type: 'influencer' | 'super-admin') {
        this.router.navigate(['/auth/login', type]);
    }
}