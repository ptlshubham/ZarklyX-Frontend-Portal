import { Component, Renderer2, Inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AuthService, User } from '../../../../core/services/auth.service';
import { BaseAuthComponent } from '../../base-auth.component';
import moment from 'moment-timezone';
import { Country, ICountry } from 'country-state-city';
import { SignupSetting } from '../../../../core/services/super-admin/signup-setting.service';
import { ToastService } from '../../../../core/services/toast.service';
declare const KTSelect: any;

@Component({
  selector: 'app-agency-basic-details-stepper',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './agency-basic-details-stepper.component.html',
  styleUrls: ['../../auth-layout.scss', './agency-basic-details-stepper.component.scss']
})
export class AgencyBasicDetailsStepperComponent extends BaseAuthComponent {

  // searchable dropdown 
  @ViewChild('countrySelect') countrySelect!: ElementRef;
  @ViewChild('timezoneSelect') timezoneSelect!: ElementRef;

  currentStep = 1;
  isLoading = false;
  submitted = false;

  errorMessage = '';

  private userId: string = '';

  agencyForm!: FormGroup;

  // Store KTSelect instances
  private selectedCountry: any;
  private selectedTimezone: any;

  // Step 1 data - Business Areas
  businessAreaOptions: any[] = [];

  accountTypeOptions = [
    { value: 'agency', label: 'Agency/Industry', icon: 'ki-office-bag', description: 'For businesses and organizations' },
    { value: 'freelancer', label: 'Freelancer', icon: 'ki-user', description: 'For individual professionals' }
  ];

  countries: string[] = [];
  timezones: string[] = [];

  clientRanges = [
    { value: '0-5', label: '0-5' },
    { value: '5-15', label: '5-15' },
    { value: '15-50', label: '15-50' },
    { value: '50+', label: '50+' }
  ];

  moduleOptions: any[] = [];

  constructor(
    public router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document,
    private signupSetting: SignupSetting,
  ) {
    super(renderer, document);

    this.checkUserId();
    this.initializeForm();
    this.initializeCountriesAndTimezones();
    this.getAllCategories();
    // get all premium feature
    this.getAllPremiumFeatures();
  }

  private checkUserId() {
    const storedUserId = localStorage.getItem('user_id');

    if (!storedUserId) {
      this.router.navigate(['/auth/signup']);
      return;
    }

    this.userId = storedUserId;
  }

  private initializeForm(): void {
    this.agencyForm = this.formBuilder.group({
      businessArea: ['', Validators.required],
      accountType: ['', Validators.required],
      companyName: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]],
      website: ['', [Validators.pattern('^(https:\\/\\/)?([A-Za-z0-9-]+\\.)+[A-Za-z]{2,}(\\/.*)?$')]],
      country: ['', Validators.required],
      timezone: ['', Validators.required],
      client: ['', Validators.required],
      selectedModules: [[]]
    });

    // For Reget the selected value in dropdown
    this.agencyForm.get('country')?.valueChanges.subscribe(value => {
      this.updateCountrySelectDisplay(value);
    });

    this.agencyForm.get('timezone')?.valueChanges.subscribe(value => {
      this.updateTimezoneSelectDisplay(value);
    });
  }

  // for the dropdown
  public initializeSelects() {
    setTimeout(() => {
      if (typeof KTSelect !== 'undefined') {
        if (this.countrySelect?.nativeElement && !this.selectedCountry) {
          this.selectedCountry = new KTSelect(this.countrySelect.nativeElement);

          const countryValue = this.agencyForm.get('country')?.value;
          if (countryValue) {
            this.updateCountrySelectDisplay(countryValue);
          }
        }
        if (this.timezoneSelect?.nativeElement && !this.selectedTimezone) {
          this.selectedTimezone = new KTSelect(this.timezoneSelect.nativeElement);

          // Set initial value if exists
          const timezoneValue = this.agencyForm.get('timezone')?.value;
          if (timezoneValue) {
            this.updateTimezoneSelectDisplay(timezoneValue);
          }
        }
      }
    }, 100);
  }

  private updateCountrySelectDisplay(value: string) {
    setTimeout(() => {
      if (this.selectedCountry && value) {
        // Update the KTSelect instance with the new value
        this.selectedCountry.update();
      }
    }, 150);
  }

  private updateTimezoneSelectDisplay(value: string) {
    setTimeout(() => {
      if (this.selectedTimezone && value) {
        // Update the KTSelect instance with the new value
        this.selectedTimezone.update();
      }
    }, 150);
  }

  public initializeCountriesAndTimezones() {
    this.countries = Country.getAllCountries()
      .map((country: ICountry) => country.name)
      .sort();
    // this.timezones = moment.tz.names();
    this.timezones = moment.tz.names().map(tz => {
      const offset = moment.tz(tz).format("Z");  // +05:30
      const name = tz.replace("_", " ");         // Asia/Kolkata → Asia/Kolkata

      return `${name} (GMT ${offset})`
    });
  }

  nextStep() {
    this.errorMessage = '';
    if (this.currentStep === 1) {
      if (!this.agencyForm.get('businessArea')?.value) {
        return;
      }
      this.registerCategory();
    } else if (this.currentStep === 2) {
      if (!this.agencyForm.get('accountType')?.value) {
        return;
      }
      this.registerUserType();
      this.initializeSelects();
    } else if (this.currentStep === 3) {
      if (!this.agencyForm.get('companyName')?.valid || !this.agencyForm.get('country')?.valid || !this.agencyForm.get('timezone')?.valid) {
        return;
      }
      this.registerCompanyDetails();
    } else if (this.currentStep === 4) {
      if (!this.agencyForm.get('client')?.value) {
        return;
      }
      this.toastService.success('No of Clients Saved Successful!', {
        position: 'top-end',
      });
      this.currentStep = 5;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      if (this.currentStep === 3) {
        this.initializeSelects();
      }
    }
  }

  registerCategory() {
    this.isLoading = true;
    this.authService.registerCategory({ category: this.agencyForm.get('businessArea')?.value, userId: this.userId }).subscribe({
      next: (res) => {
        if (res) {
          this.isLoading = false;
          this.currentStep = 2;
          this.toastService.success('Business Area Saved Successful!', {
            position: 'top-end',
          });
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
        this.isLoading = false;
        this.errorMessage = err.error.message;
      }
    })
  }

  registerUserType() {
    this.isLoading = true;
    this.authService.registerUserType({ userType: this.agencyForm.get('accountType')?.value, userId: this.userId }).subscribe({
      next: (res) => {
        if (res) {
          this.isLoading = false;
          this.toastService.success('Account Type Saved Successful!', {
            position: 'top-end',
          });
          this.currentStep = 3;
          this.initializeSelects();
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
        this.isLoading = false;
        this.errorMessage = err.error.message
      }
    })
  }

  registerCompanyDetails() {
    this.isLoading = true;
    const companyDeatilsForm = this.agencyForm.value;
    const payload = {
      userId: this.userId,
      companyId: localStorage.getItem('company_id'),
      companyName: companyDeatilsForm.companyName,
      website: companyDeatilsForm.website,
      country: companyDeatilsForm.country,
      timezone: companyDeatilsForm.timezone,
    }

    this.authService.registerCompanyDetails(payload).subscribe({
      next: (res: any) => {
        if (res) {
          this.isLoading = false;
          this.toastService.success('Register Company Details Saved Successful!', {
            position: 'top-end',
          });
          localStorage.setItem('company_id', res.data.companyId);
          this.currentStep = 4;
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
        this.isLoading = false;
        console.error(err);
        this.errorMessage = err.error.message;
      }
    })
  }

  registerFinalStep() {
    this.isLoading = true;
    const companyDeatilsForm = this.agencyForm.value;
    const payload = {
      userId: this.userId,
      noOfClientsRange: companyDeatilsForm.client,
      selectedModules: companyDeatilsForm.selectedModules
    }

    this.authService.registerFinalStep(payload).subscribe({
      next: (res: any) => {
        if (res) {
          this.isLoading = false;
          this.toastService.success('Register Successful!', {
            position: 'top-end',
          });

          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_roles', JSON.stringify(['admin']));
          localStorage.setItem('user_type', 'main');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  getAllCategories() {
    this.signupSetting.getAllCategory().subscribe({
      next: res => {
        const activeCategories = res.data.filter((item: any) => item.isActive === 1);
        this.businessAreaOptions = activeCategories.map((item: any) => ({
          value: item.id,
          label: item.name,
          icon: item.icon ? 'ki-' + item.icon : ""
        }));
      },
      error: (err) => {
        this.toastService.error(err.error.message, {
          position: 'top-end',
        });
        console.error(err)
      }
    });
  }

  getAllPremiumFeatures() {
    this.signupSetting.getAllPremiumFeatures().subscribe({
      next: res => {
        const activeModule = res.data.filter((item: any) => item.isActive === 1);
        this.moduleOptions = activeModule.map((item: any) => ({
          value: item.id,
          label: item.name,
          icon: 'ki-' + item.icon
        }))
      },
      error: err => console.error(err)
    });
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.agencyForm.get('businessArea')?.value;
      case 2:
        return !!this.agencyForm.get('accountType')?.value;
      case 3:
        return !!(this.agencyForm.get('companyName')?.valid && this.agencyForm.get('country')?.valid && this.agencyForm.get('timezone')?.valid);
      case 4:
        return !!this.agencyForm.get('client')?.value;
      case 5:
        return this.agencyForm.get('selectedModules')?.value.length > 0;
      default:
        return false;
    }
  }

  toggleBusinessArea(value: any) {
    const current = this.agencyForm.get('businessArea')?.value;
    this.agencyForm.get('businessArea')?.setValue(current === value ? '' : value);
  }

  isBusinessAreaSelected(value: any): boolean {
    return this.agencyForm.get('businessArea')?.value === value;
  }

  toggleAccountType(value: any) {
    this.agencyForm.get('accountType')?.setValue(value);
  }

  isAccountTypeSelected(value: any): boolean {
    return this.agencyForm.get('accountType')?.value === value;
  }

  toggleModule(value: any) {
    const currentModules = this.agencyForm.get('selectedModules')?.value || [];
    const index = currentModules.indexOf(value);
    if (index > -1) {
      currentModules.splice(index, 1);
    } else {
      currentModules.push(value);
    }
    this.agencyForm.get('selectedModules')?.setValue([...currentModules]);
  }

  isModuleSelected(value: any): boolean {
    return this.agencyForm.get('selectedModules')?.value.includes(value);
  }

  getStepBgClass(): string {
    return `step-${this.currentStep}`;
  }

  get f() { return this.agencyForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.agencyForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.registerFinalStep()
  }
}