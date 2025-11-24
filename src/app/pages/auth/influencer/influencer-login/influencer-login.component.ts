import { Component, Renderer2, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseAuthComponent } from '../../base-auth.component';

@Component({
  selector: 'app-influencer-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './influencer-login.component.html',
  styleUrls: ['../../auth-layout.scss', './influencer-login.component.scss'],
})
export class InfluencerLoginComponent extends BaseAuthComponent {
  loginForm!: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';
  fieldTextType = false;
  isOtpPage = false;

  // OTP
  otpValues: string[] = ['', '', '', '', '', ''];
  resendTimer = 60;
  otpInterval: any;

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
      emailOrMobile: [
        '', [Validators.required, Validators.pattern(/^(?:\+?\d{7,15}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]
      ]
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
      emailOrMobile: this.loginForm.value.emailOrMobile
    };

    setTimeout(() => {
      this.isLoading = false;

      this.startOtpTimer();
      this.isOtpPage = true;
      this.loginForm.get('emailOrMobile')?.disable();
    }, 600);
    // this.authService.login(credentials, 'main').subscribe({
    //     next: (success) => {
    //         this.isLoading = false;
    //         if (success) {
    //             this.authService.redirectToUserDashboard();
    //         } else {
    //             this.errorMessage = 'Invalid emailOrMobile or password';
    //         }
    //     },
    //     error: (error) => {
    //         this.isLoading = false;
    //         this.errorMessage = 'Login failed. Please try again.';
    //         console.error('Login error:', error);
    //     }
    // });
  }

  /**
   * Password Hide/Show
   */
  // toggleFieldTextType() {
  //     this.fieldTextType = !this.fieldTextType;
  // }

  // switchLoginType(type: 'login' | 'login/super-admin') {
  //   this.router.navigate(['/auth', type]);
  // }

  onOtpInput(event: any, index: number) {
    const value = event.target.value;

    this.errorMessage = '';

    if (!/^[0-9]?$/.test(value)) {
      event.target.value = '';
      return;
    }

    this.otpValues[index] = value;

    if (value && index < 5) {
      const nextInput: any = document.querySelector(`input[name = "code_${index + 1}"]`);
      nextInput?.focus();
    }

    if (!value && index > 0) {
      const prevInput: any = document.querySelector(`input[name = "code_${index - 1}"]`);
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

  startOtpTimer() {
    this.resendTimer = 60;
    clearInterval(this.otpInterval);

    this.otpInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
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

    // Disable Inputs
    this.loginForm.get('emailOrMobile')?.disable();
    const inputs = document.querySelectorAll<HTMLInputElement>('input[name^="code_"]');
    inputs.forEach((input) => input.disabled = true);

    setTimeout(() => {
      this.isLoading = false;
      if (otp === '123456') {

        this.authService.login({ username: 'influencer1', password: 'password' }, 'influencer').subscribe({
          next: (success) => {
            this.isLoading = false;
            if (success) {
              this.authService.redirectToUserDashboard();
              return;
            } else {
              this.errorMessage = 'Invalid emailOrMobile or password';
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Login failed. Please try again.';
            console.error('Login error:', error);
          }
        });
      } else {
        this.errorMessage = 'Invalid OTP. Please try again.';
      }

      // Re-enable inputs if needed
      inputs.forEach((input) => input.disabled = false);
    }, 600);
  }


  resendOtp() {
    if (this.resendTimer > 0) return;

    console.log(' RESEND OTP TRIGGERED');
    this.startOtpTimer();
  }
}
