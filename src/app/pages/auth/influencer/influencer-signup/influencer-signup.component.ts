import { Component, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BaseAuthComponent } from '../../base-auth.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';

declare const KTSelect: any;

@Component({
  selector: 'app-influencer-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, HttpClientModule],
  templateUrl: './influencer-signup.component.html',
  styleUrls: ['../../auth-layout.scss', './influencer-signup.component.scss'],
})
export class InfluencerSignUpComponent extends BaseAuthComponent {

  signupForm!: FormGroup;
  submitted = false;

  countryCodes: any[] = [];

  isOtpPage = false;
  isLoading = false;
  errorMessage = '';

  // OTP
  otpValues: string[] = ['', '', '', '', '', ''];
  resendTimer = 60;
  otpInterval: any;

  @ViewChild('countrySelect') countrySelect!: ElementRef;

  ktConfig = JSON.stringify({
    displayTemplate: `<div class="flex items-center gap-2">
                      <span class="text-foreground">{{text}}</span>
                    </div>`,
    optionTemplate: `<div class="flex items-center gap-2">
                      <span class="text-foreground">{{text}} - {{name}}</span>
                    </div>
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
      text: `${code}`
    });
  }

  constructor(
    private http: HttpClient,
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
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,30}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2,30}$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      countryCode: ['', Validators.required],
      acceptTaC: [false]
    });
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
    const selected = this.countryCodes.find(c => c.country === 'CA') || { country: 'CA', code: '+1' };
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
    this.http.get<any[]>("https://restcountries.com/v3.1/all?fields=name,cca2,idd,timezones")
      .subscribe((res: any[]) => {
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

  onOtpInput(event: any, index: number) {
    const value = event.target.value;
    this.errorMessage = '';

    if (!/^[0-9]?$/.test(value)) {
      event.target.value = '';
      return;
    }

    this.otpValues[index] = value;

    if (value && index < 5) {
      const nextInput: any = document.querySelector(`input[name="code_${index + 1}"]`);
      nextInput?.focus();
    }

    if (!value && index > 0) {
      const prevInput: any = document.querySelector(`input[name="code_${index - 1}"]`);
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

    if (otp === '123456') {
      // this.authService.registerAcoount(this.signupForm.value).subscribe(isCreated => {
      //   if (isCreated) {
      //     this.router.navigate(['/auth/influencer-details']);
      //     return;
      //   } else {
      //     // this.errorMessage = 'Invalid OTP!';
      //     this.isLoading = false;

      //     inputs.forEach((input) => input.disabled = false);
      //   }
      // });
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
