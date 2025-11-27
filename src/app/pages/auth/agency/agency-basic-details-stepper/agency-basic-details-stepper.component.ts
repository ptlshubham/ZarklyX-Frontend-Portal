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

  private userId: string = '';

  agencyForm!: FormGroup;

  // Store KTSelect instances
  private selectedCountry: any;
  private selectedTimezone: any;

  // Step 1 data - Business Areas
  businessAreaOptions = [
    { value: 'Advertising', label: 'Advertising', icon: 'ki-rocket' },
    { value: 'Architecture', label: 'Architecture', icon: 'ki-home-2' },
    { value: 'Culture', label: 'Culture', icon: 'ki-book-open' },
    { value: 'Fashion', label: 'Fashion', icon: 'ki-star' },
    { value: 'Food', label: 'Food', icon: 'ki-cup' },
    { value: 'Healthcare', label: 'Healthcare', icon: 'ki-heart' },
    { value: 'Insurance', label: 'Insurance', icon: 'ki-shield-tick' },
    { value: 'Life-science', label: 'Life Science', icon: 'ki-flask' },
    { value: 'Media', label: 'Media', icon: 'ki-satellite' },
    { value: 'Ngos', label: 'NGOs', icon: 'ki-people' },
    { value: 'Sports', label: 'Sports', icon: 'ki-medal-star' },
    { value: 'Technology', label: 'Technology', icon: 'ki-setting' },
    { value: 'Tourism', label: 'Tourism', icon: 'ki-map' },
    { value: 'Other', label: 'Other', icon: 'ki-category' },

  ];

  accountTypeOptions = [
    { value: 'organization', label: 'Agency/Industry', icon: 'ki-office-bag', description: 'For businesses and organizations' },
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

  moduleOptions = [
    { value: 'Accounting', label: 'Accounting', icon: 'ki-calculator', description: 'Financial management and bookkeeping' },
    { value: 'Email-Marketing', label: 'Email Marketing', icon: 'ki-sms', description: 'Email campaign management' },
    { value: 'Human-Resource', label: 'Human Resource', icon: 'ki-badge', description: 'HR and employee management' },
    { value: 'IT-Management', label: 'IT Management', icon: 'ki-technology-2', description: 'IT infrastructure management' },
    { value: 'Sales-Marketing', label: 'Sales and Marketing', icon: 'ki-chart-line', description: 'Sales and marketing tools' },
    { value: 'Social', label: 'Social', icon: 'ki-messages', description: 'Social media management' },
    { value: 'Tickets', label: 'Tickets', icon: 'ki-burger-menu-2', description: 'Manage customer support tickets' }
  ];

  constructor(
    public router: Router,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    renderer: Renderer2,
    @Inject(DOCUMENT) document: Document
  ) {
    super(renderer, document);

    this.checkUserId();
    this.initializeForm();
    this.initializeCountriesAndTimezones();
  }

  private checkUserId() {
    const storedUserId = localStorage.getItem('userId');

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
      companyName: ['', Validators.required],
      website: ['', [Validators.pattern(/^https?:\/\/.+/)]],
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
    this.timezones = moment.tz.names();
  }

  nextStep() {
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
    } else if (this.currentStep === 3) {
      if (!this.agencyForm.get('companyName')?.valid || !this.agencyForm.get('country')?.valid || !this.agencyForm.get('timezone')?.valid) {
        return;
      }
      this.registerCompanyDetails();
    } else if (this.currentStep === 4) {
      if (!this.agencyForm.get('client')?.value) {
        return;
      }
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
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  registerUserType() {
    this.isLoading = true;
    this.authService.registerUserType({ userType: this.agencyForm.get('accountType')?.value, userId: this.userId }).subscribe({
      next: (res) => {
        if (res) {
          this.isLoading = false;
          this.currentStep = 3;
          this.initializeSelects();
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }

  registerCompanyDetails() {
    this.isLoading = true;
    const companyDeatilsForm = this.agencyForm.value;
    const payload = {
      userId: this.userId,
      companyName: companyDeatilsForm.companyName,
      website: companyDeatilsForm.website,
      country: companyDeatilsForm.country,
      timezone: companyDeatilsForm.timezone,
    }

    this.authService.registerCompanyDetails(payload).subscribe({
      next: (res) => {
        if (res) {
          this.isLoading = false;
          this.currentStep = 4;
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
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
    const dummyMainUser = {
      email: 'mainuser@example.com',
      username: 'main_user',
      adminId: '',
      roles: ['user'],
      userType: 'main'
    };

    this.authService.registerFinalStep(payload).subscribe({
      next: (res) => {
        if (res) {
          this.isLoading = false;

          this.router.navigate(['/dashboard']);
          localStorage.setItem('auth_token', `${dummyMainUser.userType}-token-${Date.now()}`);
          localStorage.setItem('user_roles', JSON.stringify(dummyMainUser.roles));
          localStorage.setItem('user_type', dummyMainUser.userType);
          localStorage.setItem('user_email', dummyMainUser.email);

          if (dummyMainUser.username) {
            localStorage.setItem('user_username', dummyMainUser.username);
          }

          if (dummyMainUser.adminId) {
            localStorage.setItem('user_admin_id', dummyMainUser.adminId);
          }

          const permissionMap: any = {
            'user': ['read:dashboard', 'read:profile'],
            'influencer': ['read:dashboard', 'read:profile', 'manage:content', 'read:analytics'],
            'admin': ['read:dashboard', 'read:users', 'write:users', 'read:reports'],
            'super-admin': ['*']
          };

          let permissions = new Set<string>();
          dummyMainUser.roles.forEach((role: string) => {
            if (permissionMap[role]) {
              permissionMap[role].forEach((p: string) => permissions.add(p));
            }
          });

          localStorage.setItem('user_permissions', JSON.stringify([...permissions]));

          // Redirect
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
      }
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