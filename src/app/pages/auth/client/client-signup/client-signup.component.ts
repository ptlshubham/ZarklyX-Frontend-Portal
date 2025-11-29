import { CommonModule } from '@angular/common';
import { Component, DOCUMENT, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseAuthComponent } from '../../base-auth.component';
import { HttpClient } from '@angular/common/http'
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';


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

  // OTP
  otpValues: string[] = ['', '', '', '', '', ''];
  resendTimer = 60;
  otpInterval: ReturnType<typeof setInterval> | null = null;

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
    private authService: AuthService,
    private router: Router
  ) {
    super(renderer, document);
    this.initializeForm();
    this.fetchCountryCodes();
  }

  private initializeForm(): void {
    this.signupForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      ownerName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      countryCode: ['', Validators.required],
      acceptTaC: [false],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

    console.log(' form data:', this.signupForm);

    setTimeout(() => {
      this.isLoading = false;

      this.startOtpTimer();
      this.isOtpPage = true;
    }, 600);
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

  submitOtp() {
    const otp = this.otpValues.join('');

    if (otp.length !== 6) {
      this.errorMessage = 'Please enter full 6-digit OTP.';
      return;
    }

    this.isLoading = true;

    const inputs = document.querySelectorAll<HTMLInputElement>('input[name^="code_"]');
    inputs.forEach((input) => input.disabled = true);

    if (otp == '123456') {
      this.authService.createAccount(this.signupForm.value).subscribe(isCreated => {
        if (isCreated) {
          this.router.navigate(['/client']);
          return;
        } else {
          this.errorMessage = 'Invalid OTP!';
          this.isLoading = false;

          inputs.forEach((input) => input.disabled = false);
        }
      });
    } else {
      this.errorMessage = 'Invalid OTP';
      this.isLoading = false;
      inputs.forEach((input) => input.disabled = false);
    }
  }


  resendOtp() {
    if (this.resendTimer > 0) return;

    console.log(' RESEND OTP TRIGGERED');
    this.startOtpTimer();
  }
  isOtpComplete(): boolean {
    return this.otpValues.length === 6 && this.otpValues.every(v => /^[0-9]$/.test(v));
  }

  wrongInfoEnter() {
    this.isOtpPage = false;
  }

}
