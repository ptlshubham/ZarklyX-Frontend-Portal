// main-login.component.ts (UPDATED VERSION)
import { Component, Renderer2, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseAuthComponent } from '../../base-auth.component';
import { ToastService } from '../../../../core/services/toast.service';
import { GOOGLE_AUTH_CONFIG } from '../../../../core/config/google-auth.config';

declare var google: any;

@Component({
    selector: 'app-main-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './main-login.component.html',
    styleUrls: ['../../auth-layout.scss', './main-login.component.scss']
})
export class MainLoginComponent extends BaseAuthComponent implements OnInit {
    loginForm!: FormGroup;
    submitted = false;
    isLoading = false;
    errorMessage = '';
    fieldTextType = false;
    isOtpPage = false;
    otpResendLoading = false;

    userId = '';

    // OTP
    otpValues: string[] = ['', '', '', '', '', ''];
    resendTimer = 60;
    otpInterval: ReturnType<typeof setInterval> | null = null;

    // Google Login
    googleLoginLoading = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private http: HttpClient,
        renderer: Renderer2,
        @Inject(DOCUMENT) document: Document
    ) {
        super(renderer, document);
        this.initializeForm();
        // authService.logout();
        localStorage.clear();
        localStorage.setItem('is_dark_mode', 'light');
    }

    private initializeForm(): void {
        this.loginForm = this.formBuilder.group({
            emailOrMobile: ['', [Validators.required, Validators.pattern(/^(?:\+?\d{7,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
            password: ['', Validators.required],
        });
    }

    override ngOnInit(): void {
        // Initialize Google Sign-In
        this.initializeGoogleSignIn();
    }

    /**
     * Initialize Google Sign-In (without rendering button)
     */
    private initializeGoogleSignIn(): void {
        try {
            google.accounts.id.initialize({
                client_id: GOOGLE_AUTH_CONFIG.clientId,
                callback: (response: any) => this.handleGoogleCredential(response),
                error_callback: () => {
                    console.log('Google Sign-In error callback triggered');
                },
                ux_mode: 'popup',
                use_fedcm_for_prompt: false
            });
        } catch (error) {
            console.error('Google Sign-In initialization error:', error);
        }
    }

    /**
     * Trigger Google Sign-In popup manually
     * Uses OAuth popup flow instead of FedCM to avoid browser restrictions
     */
    signInWithGoogle(): void {
        if (typeof google === 'undefined' || !google.accounts) {
            this.toastService.error('Google Sign-In is not available', {
                position: 'top-end',
            });
            return;
        }

        try {
            // Use OAuth2 popup flow instead of FedCM prompt
            const client = google.accounts.oauth2.initCodeClient({
                client_id: GOOGLE_AUTH_CONFIG.clientId,
                scope: 'email profile openid',
                ux_mode: 'popup',
                callback: (response: any) => {
                    if (response.code) {
                        this.handleGoogleAuthCode(response.code);
                    } else if (response.error) {
                        console.error('Google OAuth error:', response);
                        this.toastService.error('Google Sign-In failed', {
                            position: 'top-end',
                        });
                    }
                }
            });
            
            client.requestCode();
        } catch (error) {
            console.error('Google Sign-In error:', error);
            this.toastService.error('Failed to open Google Sign-In', {
                position: 'top-end',
            });
        }
    }

    /**
     * Handle Google authorization code
     * Send to backend to exchange for user info and JWT token
     */
    private handleGoogleAuthCode(code: string): void {
        this.googleLoginLoading = true;
        this.errorMessage = '';

        this.authService.loginWithGoogle({ code: code }).subscribe({
            next: (res: any) => {
                this.googleLoginLoading = false;

                if (res.success) {
                    console.log('Google login successful:', res.data);

                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('user_id', res.data.userId);
                    localStorage.setItem('user_email', res.data.email);
                    localStorage.setItem('user_roles', JSON.stringify(['admin']));
                    localStorage.setItem('user_type', 'main');
                    localStorage.setItem('is_dark_mode', 'light');

                    this.toastService.success(res.data.isNew ? 'Welcome! Account created.' : 'Login successful!', {
                        position: 'top-end',
                    });

                    if (res.data.isNew) {
                        setTimeout(() => {
                            this.router.navigate(['/auth/basic-details']);
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.router.navigate(['/dashboard']);
                        }, 1000);
                    }
                } else {
                    this.errorMessage = res.message || 'Google login failed';
                    this.toastService.error(this.errorMessage, {
                        position: 'top-end',
                    });
                }
            },
            error: (err) => {
                this.googleLoginLoading = false;
                console.error('Google login error:', err);

                const errorMessage = err.error?.message || 'Google login failed. Please try again.';
                this.errorMessage = errorMessage;
                this.toastService.error(errorMessage, {
                    position: 'top-end',
                });
            }
        });
    }

    /**
     * Handle Google Credential Response
     * Sends credential to backend for verification and login
     */
    handleGoogleCredential(response: any): void {
        debugger
        if (!response.credential) {
            this.toastService.error('Failed to get Google credential', {
                position: 'top-end',
            });
            return;
        }

        this.googleLoginLoading = true;
        this.errorMessage = '';

        // Call backend to verify and login with Google
        this.authService.loginWithGoogle({ credential: response.credential }).subscribe({
            next: (res: any) => {
                this.googleLoginLoading = false;

                if (res.success) {
                    console.log('Google login successful:', res.data);

                    // Save authentication data
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('user_id', res.data.userId);
                    localStorage.setItem('user_email', res.data.email);
                    localStorage.setItem('user_roles', JSON.stringify(['admin']));
                    localStorage.setItem('user_type', 'main');
                    localStorage.setItem('is_dark_mode', 'light');

                    this.toastService.success(res.data.isNew ? 'Welcome! Account created.' : 'Login successful!', {
                        position: 'top-end',
                    });

                    // Handle post-login routing
                    if (res.data.isNew) {
                        // New user - redirect to complete profile
                        setTimeout(() => {
                            this.router.navigate(['/auth/basic-details']);
                        }, 1000);
                    } else {
                        // Existing user - redirect to dashboard
                        setTimeout(() => {
                            this.router.navigate(['/dashboard']);
                        }, 1000);
                    }
                } else {
                    this.errorMessage = res.message || 'Google login failed';
                    this.toastService.error(this.errorMessage, {
                        position: 'top-end',
                    });
                }
            },
            error: (err) => {
                this.googleLoginLoading = false;
                console.error('Google login error:', err);

                const errorMessage = err.error?.message || 'Google login failed. Please try again.';
                this.errorMessage = errorMessage;
                this.toastService.error(errorMessage, {
                    position: 'top-end',
                });
            }
        });
    }

    /**
     * Get backend URL based on environment
     */
    private getBackendUrl(): string {
        // Update this based on your environment
        const isDevelopment = !window.location.hostname.includes('production-domain');
        return isDevelopment ? 'http://localhost:9005' : 'https://api.yourdomain.com';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) return;
        this.errorMessage = '';
        this.isLoading = true;

        const input = this.loginForm.value.emailOrMobile;
        let credentials: any = {
            password: this.loginForm.value.password
        };

        if (/^\d+$/.test(input)) {
            credentials.contact = input;
        }
        else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
            credentials.email = input;
        }
        else {
            this.isLoading = false;
            this.errorMessage = 'Please enter a valid email or mobile number.';
            return;
        }

        this.authService.login(credentials, 'main').subscribe({
            next: res => {
                this.isLoading = false;
                this.isOtpPage = true;
                this.userId = res.userId
                this.startOtpTimer();
                this.toastService.success('OTP Send successfully!', {
                    position: 'top-end',
                });
                // Disable Inputs
                this.loginForm.get('emailOrMobile')?.disable();
                this.loginForm.get('password')?.disable();
            },
            error: err => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Login failed';
            }
        });
    }

    switchLoginType(type: 'influencer' | 'super-admin') {
        this.router.navigate(['/auth/login', type]);
    }

    onOtpInput(event: Event, index: number) {
        const value = (event.target as HTMLInputElement).value;

        this.errorMessage = '';

        if (!/^[0-9]?$/.test(value)) {
            (event.target as HTMLInputElement).value = '';
            return;
        }

        this.otpValues[index] = value;

        if (value && index < 5) {
            const nextInput = document.querySelector<HTMLInputElement>(`input[name="code_${index + 1}"]`);
            nextInput?.focus();
        }

        if (!value && index > 0) {
            const prevInput = document.querySelector<HTMLInputElement>(`input[name="code_${index - 1}"]`);
            prevInput?.focus();
        }
        if (value && index === 5) {
            this.submitOtp();
        }
    }

    onOtpKeyDown(event: KeyboardEvent, index: number) {
        const input = event.target as HTMLInputElement;

        if (event.key === 'Backspace') {
            if (input.value === '' && index > 0) {
                const prevInput = document.querySelector<HTMLInputElement>(`input[name="code_${index - 1}"]`);
                if (prevInput) {
                    prevInput.value = '';
                    this.otpValues[index - 1] = '';
                    prevInput.focus();
                }
            } else {
                // Clear current input only
                input.value = '';
                this.otpValues[index] = '';
            }
        }
    }

    onOtpPaste(event: ClipboardEvent) {
        event.preventDefault();

        const pasted = event.clipboardData?.getData('text') ?? '';
        const digits = pasted.replace(/\D/g, '').slice(0, 6);

        if (!digits) return;

        digits.split('').forEach((digit, idx) => {
            const input = document.querySelector<HTMLInputElement>(`input[name="code_${idx}"]`);
            if (input) {
                input.value = digit;
                this.otpValues[idx] = digit;
            }
        });

        const lastIndex = digits.length - 1;
        const lastInput = document.querySelector<HTMLInputElement>(`input[name="code_${lastIndex}"]`);
        lastInput?.focus();

        if (digits.length === 6) {
            this.submitOtp();
        }
    }

    startOtpTimer(): void {
        this.resendTimer = 60;
        if (this.otpInterval) clearInterval(this.otpInterval);

        this.otpInterval = setInterval(() => {
            this.resendTimer--;
            if (this.resendTimer <= 0 && this.otpInterval) {
                clearInterval(this.otpInterval);
            }
        }, 1000);
    }

    submitOtp() {
        const otp = this.otpValues.join('');

        // Validate OTP length
        if (otp.length !== 6) {
            this.errorMessage = 'Please enter full 6-digit OTP.';
            return;
        }
        this.isLoading = true;

        const inputs = document.querySelectorAll<HTMLInputElement>('input[name^="code_"]');
        inputs.forEach((input) => input.disabled = true);

        this.authService.verifyLoginOtp({ userId: this.userId, otp }).subscribe({
            next: (res) => {
                this.isLoading = false;
                if (res) {
                    //clean old local storage
                    // this.authService.logout();
                    // localStorage.clear();
                    localStorage.setItem('is_dark_mode', 'light');
                    if (res.data.isRegistering) {
                        localStorage.setItem('user_id', res.data.userId);
                        this.router.navigate(['/auth/basic-details']);
                        return;
                    }

                    // add credintial for auth
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('user_id', res.data.userId);
                    localStorage.setItem('user_email', this.loginForm.value.emailOrMobile);
                    localStorage.setItem('user_roles', JSON.stringify(['admin']));
                    localStorage.setItem('user_type', 'main');

                    // const userX = {
                    //     id: res.data.userId,
                    //     email: this.loginForm.value.emailOrMobile,
                    //     roles: ['user'],
                    //     userType: 'main' as 'main'
                    // };
                    // this.authService['currentUserSubject'].next(userX);

                    this.router.navigate(['/dashboard']);
                    // this.authService.redirectToUserDashboard();
                    return;
                } else {
                    this.errorMessage = 'Invalid OTP';
                    inputs.forEach((input) => input.disabled = false);
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.isOtpPage = true;
                this.errorMessage = error.error.message;
                console.error('Login error:', error);
                inputs.forEach((input) => input.disabled = false);
            }
        });
    }

    resendOtp() {
        if (this.resendTimer > 0) return;
        const input = this.loginForm.value.emailOrMobile;
        this.otpResendLoading = true;
        let credentials: any = {};

        if (/^\d+$/.test(input)) {
            credentials.contact = input;
        }
        else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
            credentials.email = input;
        }
        else {
            this.isLoading = false;
            this.errorMessage = 'Please enter a valid email or mobile number.';
            return;
        }
        this.authService.resendOtp({ email: credentials.email, contact: credentials.contact, otpFlow: 'login' }).subscribe({
            next: (success) => {
                if (success) {
                    this.startOtpTimer();
                    this.otpResendLoading = false;
                    this.toastService.success('OTP Send successfully!', {
                        position: 'top-end',
                    });
                } else {
                    this.resendTimer = 0;
                    this.otpResendLoading = false;
                }
            },
            error: (err) => {
                this.toastService.error(err.error.message, {
                    position: 'top-end',
                });
                this.resendTimer = 0;
                this.otpResendLoading = false;
            }
        })
    }

    isOtpComplete(): boolean {
        return this.otpValues.length === 6 && this.otpValues.every(v => /^[0-9]$/.test(v));
    }
}
