import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseAuthComponent } from '../../base-auth.component';
import { HttpClient } from '@angular/common/http'
import { Router, RouterLink } from "@angular/router";
import { ClientAuthService } from '../../../../core/services/client-auth.service';


declare const KTSelect: any;



@Component({
  selector: 'app-client-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.scss', '../../auth-layout.scss']
})

export class ClientSignupComponent extends BaseAuthComponent {

  signupForm!: FormGroup;
  submitted = false;

  countryCodes: any = [];

  isOtpPage = false;
  isLoading = false;
  errorMessage = '';

  // Hardcoded userId and companyId
  userId = 'bf17509c-e27c-4106-87bd-aa2be1b5fa04';
  companyId = 'cc173ad0-df34-4d2a-892c-d92aed4c1551';

  // OTP
  otpValues: string[] = ['', '', '', '', '', ''];
  resendTimer = 60;
  otpInterval: ReturnType<typeof setInterval> | null = null;

  // Store email and contact for OTP verification
  signupEmail = '';
  signupContact = '';

  @ViewChild('countrySelect') countrySelect!: ElementRef;

  showConfirmPassword: boolean = false;
  showPassword: boolean = false;

  ktConfig = JSON.stringify({
    displayTemplate: `<div class="flex items-center gap-2"><span class="text-foreground">{{text}}</span></div>`,
    optionTemplate: `<div class="flex flex-col"><span class="text-foreground text-sm">{{text}}</span><span class="text-secondary text-xs mt-1">{{name}}</span></div>`,
    optionsClass: "kt-scrollable overflow-auto max-h-[250px]"
  });

  getSelectOption(country: string, code: string) {
    return JSON.stringify({
      name: country,
      text: `${code}`
    });
  }

  constructor(private http: HttpClient,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document,
    private formBuilder: FormBuilder,
    private authService: ClientAuthService,
    private router: Router
  ) {
    super(renderer, document);
    this.initializeForm();
    this.fetchCountryCodes();
  }

  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      businessName: ['', [Validators.required, Validators.minLength(2)]],
      clientfirstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      clientLastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      countryCode: ['', Validators.required],
      acceptTaC: [false],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/)]],
      confirmPassword: ['', Validators.required],
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
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (KTSelect) {
        new KTSelect(this.countrySelect.nativeElement);
      }
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
    const selected = this.countryCodes.find((c: any) => c.country === countryShort);

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
    const selected = this.countryCodes.find((c: any) => c.country === 'IN') || { country: 'IN', code: '+91' };
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
    this.http.get<any>("https://restcountries.com/v3.1/all?fields=name,cca2,idd,timezones")
      .subscribe((res) => {
        this.countryCodes = res.map((item: any, index: any) => {

          const root = item?.idd?.root || "";
          const suffix = item?.idd?.suffixes?.length ? item.idd.suffixes[0] : "";
          const fullCode = root + suffix;

          return {
            id: index,
            country: item.cca2,
            code: fullCode
          };
        }).filter((x: any) => x.code !== "");
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

    // Extract ISD code and ISO code from countryCode
    const countryCodeValue = this.signupForm.get('countryCode')?.value || '';
    const isdCode = countryCodeValue.split(' - ')[0] || '';
    const isoCode = countryCodeValue.split(' - ')[1] || '';

    const payload = {
      userId: this.userId,
      companyId: this.companyId,
      businessName: this.signupForm.get('businessName')?.value,
      clientfirstName: this.signupForm.get('clientfirstName')?.value,
      clientLastName: this.signupForm.get('clientLastName')?.value,
      email: this.signupForm.get('email')?.value,
      contact: this.signupForm.get('contact')?.value,
      isdCode: isdCode,
      isoCode: isoCode,
      password: this.signupForm.get('password')?.value,
      confirmPassword: this.signupForm.get('confirmPassword')?.value,
    };

    console.log('Signup payload:', payload);

    this.authService.startClientSignup(payload).subscribe({
      next: (response) => {
        console.log('Signup response:', response);
        if (response.success) {
          // Store email and contact for OTP verification
          this.signupEmail = payload.email;
          this.signupContact = payload.contact;

          this.isLoading = false;
          this.startOtpTimer();
          this.isOtpPage = true;
        } else {
          this.isLoading = false;
          this.errorMessage = response.message || 'Signup failed. Please try again.';
        }
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'An error occurred during signup.';
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

  onOtpPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    if (digits.length === 0) return;

    this.errorMessage = '';

    // Fill OTP inputs with pasted digits
    for (let i = 0; i < digits.length && i < 6; i++) {
      this.otpValues[i] = digits[i];
      const input = document.querySelector<HTMLInputElement>(`input[name="code_${i}"]`);
      if (input) {
        input.value = digits[i];
      }
    }

    // Focus on the next empty input or the last input
    const nextEmptyIndex = Math.min(digits.length, 5);
    const nextInput = document.querySelector<HTMLInputElement>(`input[name="code_${nextEmptyIndex}"]`);
    nextInput?.focus();

    // Auto-submit if all 6 digits are filled
    if (digits.length === 6) {
      setTimeout(() => this.submitOtp(), 100);
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

  submitOtp() {
    const otp = this.otpValues.join('');

    if (otp.length !== 6) {
      this.errorMessage = 'Please enter full 6-digit OTP.';
      return;
    }

    this.isLoading = true;

    const inputs = document.querySelectorAll<HTMLInputElement>('input[name^="code_"]');
    inputs.forEach((input) => input.disabled = true);

    const payload = {
      email: this.signupEmail,
      otp: otp,
      mbOTP: otp // Using same OTP for both email and mobile for now
    };

    this.authService.verifyClientSignupOtp(payload).subscribe({
      next: (response) => {
        console.log('OTP verification response:', response);
        if (response.success) {
          // Store token in localStorage
          if (response.data?.token) {
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user_roles', JSON.stringify(['client']));
            if (response.data.email) {
              localStorage.setItem('user_email', response.data.email);
            }
            localStorage.setItem('clientData', JSON.stringify(response.data));
          }

          this.isLoading = false;
          // Navigate to client dashboard
          this.router.navigate(['/client']).then(() => {
            console.log('Navigation to client dashboard successful');
          });
        } else {
          this.errorMessage = response.message || 'Invalid OTP!';
          this.isLoading = false;
          inputs.forEach((input) => input.disabled = false);
        }
      },
      error: (error) => {
        console.error('OTP verification error:', error);
        this.errorMessage = error.error?.message || 'Invalid OTP. Please try again.';
        this.isLoading = false;
        inputs.forEach((input) => input.disabled = false);
      }
    });
  }


  resendOtp() {
    if (this.resendTimer > 0) return;

    console.log('RESEND OTP TRIGGERED');
    this.isLoading = true;

    // Extract ISD code and ISO code from countryCode
    const countryCodeValue = this.signupForm.get('countryCode')?.value || '';
    const isdCode = countryCodeValue.split(' - ')[0] || '';
    const isoCode = countryCodeValue.split(' - ')[1] || '';

    const payload = {
      userId: this.userId,
      companyId: this.companyId,
      businessName: this.signupForm.get('businessName')?.value,
      clientfirstName: this.signupForm.get('clientfirstName')?.value,
      clientLastName: this.signupForm.get('clientLastName')?.value,
      email: this.signupEmail,
      contact: this.signupContact,
      isdCode: isdCode,
      isoCode: isoCode,
      password: this.signupForm.get('password')?.value,
      confirmPassword: this.signupForm.get('confirmPassword')?.value,
    };

    this.authService.startClientSignup(payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoading = false;
          this.startOtpTimer();
          this.errorMessage = '';
        } else {
          this.isLoading = false;
          this.errorMessage = response.message || 'Failed to resend OTP.';
        }
      },
      error: (error) => {
        console.error('Resend OTP error:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to resend OTP.';
      }
    });
  }
  isOtpComplete(): boolean {
    return this.otpValues.length === 6 && this.otpValues.every(v => /^[0-9]$/.test(v));
  }

  wrongInfoEnter() {
    this.isOtpPage = false;
  }

}
