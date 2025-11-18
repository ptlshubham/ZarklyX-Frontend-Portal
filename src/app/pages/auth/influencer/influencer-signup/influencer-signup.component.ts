import { Component, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BaseAuthComponent } from '../../base-auth.component';
import { HttpClient } from '@angular/common/http';

declare const KTSelect: any;

@Component({
  selector: 'app-influencer-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
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

  constructor(private http: HttpClient,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document,
    private formBuilder: FormBuilder
  ) {
    super(renderer, document);
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      countryCode: ['', Validators.required],
      acceptTaC: [false]
    });
    this.fetchCountryCodes();
  }


    loadCountryCode() {
    this.http.get<any>('https://ipapi.co/json/').subscribe(res => {
      if (res && res.country_calling_code) {
        console.log(res);
        // this.form.countryCode = res.country_calling_code;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (KTSelect) {
        new KTSelect(this.countrySelect.nativeElement);
      }
    }, 100);
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
  submitOtp() {
    const otp = this.otpValues.join('');

    if (otp.length !== 6) {
      this.errorMessage = 'Please enter full 6-digit OTP.';
      return;
    }

    console.log('OTP ENTERED:', otp);
  }

  resendOtp() {
    if (this.resendTimer > 0) return;

    console.log(' RESEND OTP TRIGGERED');
    this.startOtpTimer();
  }
  isOtpComplete(): boolean {
    return this.otpValues.length === 6 && this.otpValues.every(v => /^[0-9]$/.test(v));
  }

  wrongInfoEnter(){
    this.isOtpPage = false;

  }
}
