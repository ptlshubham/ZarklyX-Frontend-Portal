import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { BaseAuthComponent } from '../../base-auth.component';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { GOOGLE_AUTH_CONFIG } from '../../../../core/config/google-auth.config';

declare const KTSelect: any;
declare var google: any;

interface CountryCode {
  id: number,
  country: string,
  code: string
}

interface RestCountryApi {
  cca2: string;
  idd?: {
    root?: string;
    suffixes?: string[];
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../auth-layout.scss']
})

export class SignupComponent extends BaseAuthComponent implements OnInit {

  signupForm!: FormGroup;
  submitted = false;

  countryCodes: CountryCode[] = [];
  userId = '';

  showPassword = false;
  showConfirmPassword = false;

  isOtpPage = false;
  isLoading = false;
  errorMessage = '';
  googleSignupLoading = false;

  // OTP
  otpValues: string[] = ['', '', '', '', '', ''];
  resendTimer = 60;

  otpResendLoading = false;
  otpInterval: ReturnType<typeof setInterval> | null = null;

  @ViewChild('countrySelect') countrySelect!: ElementRef;

  ktConfig = JSON.stringify({
    displayTemplate: `<div class="flex items-center gap-2">
                      <span class="text-foreground">{{text}}</span>
                    </div>`,
    optionTemplate: `<div class="flex items-center gap-2">
                      <span class="text-foreground">{{text}}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="size-3.5 ms-auto hidden text-primary kt-select-option-selected:block">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>`,
    optionsClass: "kt-scrollable overflow-auto max-h-[250px]"
  });


  getSelectOption(country: string, code: string) {
    return JSON.stringify({
      name: country,
      text: code
    });
  }

  constructor(private http: HttpClient,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    super(renderer, document);
    localStorage.clear();
    localStorage.setItem('is_dark_mode', 'light');
    this.initializeForm();
    this.fetchCountryCodes();
  }

  override ngOnInit(): void {
    this.initializeGoogleSignIn();
  }

  /**
   * Initialize Google Sign-In Button
   */
  private initializeGoogleSignIn(): void {
    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_AUTH_CONFIG.clientId,
        callback: (response: any) => this.handleGoogleCredential(response),
        error_callback: () => {
          // Avoid changing UI; show a light error
          console.log('Google Sign-In error callback triggered');
        },
        ux_mode: 'popup',
        use_fedcm_for_prompt: false
      });
    } catch (error) {
      console.error('Google Sign-In initialization error:', error);
      this.toastService.error('Failed to initialize Google Sign-In', {
        position: 'top-end',
      });
    }
  }

  /**
   * Trigger Google Sign-Up via OAuth2 popup (avoids FedCM)
   */
  signUpWithGoogle(): void {
    if (typeof google === 'undefined' || !google.accounts) {
      this.toastService.error('Google Sign-In is not available', {
        position: 'top-end',
      });
      return;
    }

    try {
      const client = google.accounts.oauth2.initCodeClient({
        client_id: GOOGLE_AUTH_CONFIG.clientId,
        scope: 'email profile openid',
        ux_mode: 'popup',
        callback: (response: any) => {
          if (response.code) {
            this.handleGoogleAuthCode(response.code);
          } else if (response.error) {
            console.error('Google OAuth error:', response);
            this.toastService.error('Google Sign-Up failed', {
              position: 'top-end',
            });
          }
        }
      });
      client.requestCode();
    } catch (error) {
      console.error('Google Sign-Up error:', error);
      this.toastService.error('Failed to open Google Sign-Up', {
        position: 'top-end',
      });
    }
  }

  /**
   * Handle authorization code: send to backend to create/login user
   */
  private handleGoogleAuthCode(code: string): void {
    this.googleSignupLoading = true;
    this.errorMessage = '';

    this.authService.sinupWithGoogle({ code }).subscribe({
      next: (res: any) => {
        this.googleSignupLoading = false;
        if (res.success) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_id', res.data.userId);
          localStorage.setItem('user_email', res.data.email);
          localStorage.setItem('user_roles', JSON.stringify(['admin']));
          localStorage.setItem('user_type', 'main');
          localStorage.setItem('is_dark_mode', 'light');

          if (res.data.isNew) {
            this.toastService.success('Welcome! Account created successfully.', { position: 'top-end' });
            setTimeout(() => this.router.navigate(['/auth/basic-details']), 800);
          } else {
            this.toastService.success('Welcome back!', { position: 'top-end' });
            setTimeout(() => this.router.navigate(['/dashboard']), 800);
          }
        } else {
          this.errorMessage = res.message || 'Google authentication failed';
          this.toastService.error(this.errorMessage, { position: 'top-end' });
        }
      },
      error: (err) => {
        this.googleSignupLoading = false;
        console.error('Google authentication error:', err);
        const errorMessage = err.error?.message || 'Failed to authenticate with Google. Please try again.';
        this.errorMessage = errorMessage;
        this.toastService.error(errorMessage, { position: 'top-end' });
      }
    });
  }

  /**
   * Handle Google Credential Response
   * Verifies token with backend and creates/logs in user
   */
  handleGoogleCredential(response: any): void {
    if (!response.credential) {
      this.toastService.error('Failed to get Google credential', {
        position: 'top-end',
      });
      return;
    }

    this.googleSignupLoading = true;
    this.errorMessage = '';

    // Call backend to verify Google token
    this.http.post('http://localhost:9005/user/auth/verify-google', {
      credential: response.credential
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          // Google token verified, now proceed with signup/login
          this.handleGoogleAuthSuccess(res.data);
        } else {
          this.googleSignupLoading = false;
          this.errorMessage = res.message || 'Google verification failed';
          this.toastService.error(this.errorMessage, {
            position: 'top-end',
          });
        }
      },
      error: (err) => {
        this.googleSignupLoading = false;
        console.error('Google verification error:', err);

        const errorMessage = err.error?.message || 'Google authentication failed. Please try again.';
        this.errorMessage = errorMessage;
        this.toastService.error(errorMessage, {
          position: 'top-end',
        });
      }
    });
  }

  /**
   * Handle successful Google authentication
   * Creates new user or logs in existing user
   */
  private handleGoogleAuthSuccess(googleData: any): void {
    // Call login endpoint which handles both login and signup
    this.authService.loginWithGoogle({ credential: googleData }).subscribe({
      next: (res: any) => {
        this.googleSignupLoading = false;

        if (res.success) {
          console.log('Google auth successful:', res.data);

          // Save authentication data
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_id', res.data.userId);
          localStorage.setItem('user_email', res.data.email);
          localStorage.setItem('user_roles', JSON.stringify(['admin']));
          localStorage.setItem('user_type', 'main');
          localStorage.setItem('is_dark_mode', 'light');

          if (res.data.isNew) {
            this.toastService.success('Welcome! Account created successfully.', {
              position: 'top-end',
            });

            // New user - redirect to complete profile
            setTimeout(() => {
              this.router.navigate(['/auth/basic-details']);
            }, 1000);
          } else {
            this.toastService.success('Welcome back!', {
              position: 'top-end',
            });

            // Existing user - redirect to dashboard
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 1000);
          }
        } else {
          this.errorMessage = res.message || 'Google authentication failed';
          this.toastService.error(this.errorMessage, {
            position: 'top-end',
          });
        }
      },
      error: (err) => {
        this.googleSignupLoading = false;
        console.error('Google authentication error:', err);

        const errorMessage = err.error?.message || 'Failed to authenticate with Google. Please try again.';
        this.errorMessage = errorMessage;
        this.toastService.error(errorMessage, {
          position: 'top-end',
        });
      }
    });
  }

  // logout() {
  //   localStorage.removeItem('auth_token');
  //   localStorage.removeItem('user_roles');
  //   localStorage.removeItem('user_type');
  //   localStorage.removeItem('user_email');
  //   localStorage.removeItem('user_username');
  //   localStorage.removeItem('user_admin_id');
  //   localStorage.removeItem('user_permissions');
  //   localStorage.removeItem('user_id');
  //   localStorage.removeItem('company_id')
  //   localStorage.removeItem('dashboard_widgets');
  // }

  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,30}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,30}$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      countryCode: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      acceptTaC: [false]
    }, {
      validators: this.matchPasswords('password', 'confirmPassword')
    });
  }

  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const pass = formGroup.get(password);
      const confirm = formGroup.get(confirmPassword);

      if (pass?.value !== confirm?.value) {
        confirm?.setErrors({ passwordMismatch: true });
      } else {
        confirm?.setErrors(null);
      }
    };
  }
  // Custom validator for phone number using libphonenumber-js
  phoneValidator = (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value;
    const countryCodeControl = this.signupForm?.get('countryCode');

    if (!phoneNumber || !countryCodeControl) {
      return null;
    }

    const countryCodeValue = countryCodeControl.value;
    if (!countryCodeValue) {
      return null;
    }

    // Extract country code (e.g., "IN" from "+91 - IN")
    const countryMatch = countryCodeValue.match(/- ([A-Z]{2})$/);
    if (!countryMatch) {
      return null;
    }

    const countryCode = countryMatch[1];
    const dialCode = countryCodeValue.split(' - ')[0];

    try {
      // Parse phone number with country code
      const phoneNumberObj = parsePhoneNumberFromString(dialCode + phoneNumber, countryCode);

      if (!phoneNumberObj || !phoneNumberObj.isValid()) {
        return { invalidPhone: true };
      }

      return null;
    } catch (error) {
      return { invalidPhone: true };
    }
  };
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (KTSelect) {
        new KTSelect(this.countrySelect.nativeElement);
      }
      // Add phone validator after form is initialized
      this.signupForm.get('contact')?.setValidators([Validators.required, this.phoneValidator]);
      this.signupForm.get('contact')?.updateValueAndValidity();
    }, 100);
  }

  getCountryByCoordinates(lat: number, lon: number) {
    this.http.get<any>('https://geolocation-db.com/json/')
      .subscribe({
        next: response => {
          const countryCode = response?.country_code?.toUpperCase();

          if (countryCode) {
            this.setCallingCodeFromCountry(countryCode);
          } else {
            this.setDefaultIndiaFallback();
          }
        },
        error: () => this.setDefaultIndiaFallback()
      });
  }

  setCallingCodeFromCountry(countryShort: string) {
    const selected = this.countryCodes.find(c => c.country === countryShort);

    if (selected) {
      this.applyCountrySelect(`${selected.code} - ${selected.country}`);
    } else {
      this.setDefaultIndiaFallback();
    }
  }

  applyCountrySelect(finalValue: string) {
    this.signupForm.patchValue({ countryCode: finalValue });

    setTimeout(() => {
      const selectEl = this.countrySelect.nativeElement;
      selectEl.value = finalValue;
      selectEl.dispatchEvent(new Event('change'));

      let instance = KTSelect.getInstance?.(selectEl);

      if (!instance) {
        instance = new KTSelect(selectEl);
      }

      if (instance && typeof instance.update === 'function') {
        instance.update();
      }
    }, 200);

  }

  setDefaultIndiaFallback() {
    const selected = this.countryCodes.find(c => c.country === 'IN') || { country: 'IN', code: '+91' };
    const finalValue = `${selected.code} - ${selected.country}`;
    this.applyCountrySelect(finalValue);
  }

  getUserLocation() {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      this.setDefaultIndiaFallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.getCountryByCoordinates(latitude, longitude);
      },
      error => {
        console.warn('Location permission denied or unavailable', error);
        this.setDefaultIndiaFallback();
      }
    );
  }

  fetchCountryCodes() {
    this.http.get<RestCountryApi[]>("https://restcountries.com/v3.1/all?fields=name,cca2,idd,timezones")
      .subscribe((res) => {
        this.countryCodes = res.map((item, index) => {

          const root = item?.idd?.root || "";
          const suffix = item?.idd?.suffixes?.length ? item.idd.suffixes[0] : "";
          const fullCode = root + suffix;

          return {
            id: index,
            country: item.cca2,
            code: fullCode
          };
        }).filter(x => x.code !== "");
      });
    this.getUserLocation();
  }

  get f() { return this.signupForm.controls; }

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

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid || !(this.signupForm.get('acceptTaC')?.value)) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    const selectedCountry = this.signupForm.get('countryCode')?.value;
    let countryCode = "";
    let defaultCountry = "";

    if (selectedCountry) {
      const parts = selectedCountry.split(" - ");
      countryCode = parts[0];
      defaultCountry = parts[1];
    }
    const payload = {
      ...this.signupForm.value,
      countryCode: countryCode,
      defaultCountry: defaultCountry
    };


    this.authService.registerAccount(payload).subscribe({
      next: (res) => {
        if (res) {
          this.isLoading = false;
          this.startOtpTimer();
          this.isOtpPage = true;
          this.userId = res.data.otpRefId;
          this.toastService.success('OTP Send successfully!', {
            position: 'top-end',
          });
        } else {
          this.errorMessage = 'Someting went Wrong';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        if (err.status === 500) {
          this.toastService.error("Faild to Send OTP", {
            position: 'top-end',
          });
          return;
        }
        this.errorMessage = err.error.message;
      }
    });
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

  submitOtp() {
    const otp = this.otpValues.join('');

    if (otp.length !== 6) {
      this.errorMessage = 'Please enter full 6-digit OTP.';
      return;
    }

    this.isLoading = true;

    const inputs = document.querySelectorAll<HTMLInputElement>('input[name^="code_"]');
    inputs.forEach((input) => input.disabled = true);
    this.authService.verifyRegisterOtp({ email: this.signupForm.get('email')?.value, otp }).subscribe({
      next: (res: any) => {
        if (res) {
          this.userId = res.data.userId;
          localStorage.setItem('user_id', this.userId)
          localStorage.setItem('user_email', this.signupForm.value.email);
          this.toastService.success('OTP Verification successfully!', {
            position: 'top-end',
          });
          this.router.navigate(['/auth/basic-details']);
        } else {
          this.errorMessage = 'Invalid OTP';
          this.isLoading = false;
          inputs.forEach((input) => input.disabled = false);
        }
      },
      error: (err) => {
        console.error(err)
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
        this.errorMessage = err.error.message;
        this.isLoading = false;
        inputs.forEach((input) => input.disabled = false);
      }
    });
  }


  resendOtp() {
    if (this.resendTimer > 0) return;
    const formValue = this.signupForm.value;

    this.otpResendLoading = true;
    this.authService.resendOtp({ email: formValue.email, contact: formValue.contact, otpFlow: 'register' }).subscribe({
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
        this.resendTimer = 0;
        this.otpResendLoading = false;
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
      }
    })
  }
  isOtpComplete(): boolean {
    return this.otpValues.length === 6 && this.otpValues.every(v => /^[0-9]$/.test(v));
  }

  wrongInfoEnter() {
    this.isOtpPage = false;
  }

}