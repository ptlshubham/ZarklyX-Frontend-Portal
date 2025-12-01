import { Component, Renderer2, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
        ReactiveFormsModule,
        RouterLink
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
    isOtpPage = false;
    otpResendLoading = false;

    userId = '';

    // OTP
    otpValues: string[] = ['', '', '', '', '', ''];
    resendTimer = 60;
    otpInterval: ReturnType<typeof setInterval> | null = null;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        renderer: Renderer2,
        @Inject(DOCUMENT) document: Document
    ) {
        super(renderer, document);
        this.initializeForm();
        authService.logout();
    }

    private initializeForm(): void {
        this.loginForm = this.formBuilder.group({
            emailOrMobile: ['', [Validators.required, Validators.pattern(/^(?:\+?\d{7,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
            password: ['', Validators.required],
        });
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
            credentials.mobile = input;
        }
        else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
            credentials.email = input;
        }
        else {
            this.isLoading = false;
            this.errorMessage = 'Please enter a valid email or mobile number.';
            return;
        }

        console.log("Final Login Payload:", credentials);

        this.authService.login(credentials, 'main').subscribe({
            next: res => {
                this.isLoading = false;
                this.isOtpPage = true;
                this.userId = res.userId
                this.startOtpTimer();
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
        console.log("OTP : " + otp);
        this.isLoading = true;

        const inputs = document.querySelectorAll<HTMLInputElement>('input[name^="code_"]');
        inputs.forEach((input) => input.disabled = true);

        this.authService.verifyLoginOtp({ userId: this.userId, otp }).subscribe({
            next: (res) => {
                this.isLoading = false;
                if (res) {
                    console.log(res);
                    //clean old local storage
                    this.authService.logout();
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

                    this.authService.redirectToUserDashboard();
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
            credentials.mobile = input;
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
                } else {
                    this.resendTimer = 0;
                    this.otpResendLoading = false;
                }
            },
            error: (err) => {
                this.resendTimer = 0;
                this.otpResendLoading = false;
            }
        })
    }

    isOtpComplete(): boolean {
        return this.otpValues.length === 6 && this.otpValues.every(v => /^[0-9]$/.test(v));
    }

}