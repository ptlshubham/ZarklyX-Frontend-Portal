import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ICity, ICountry, IState } from 'country-state-city';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CountryCode } from 'libphonenumber-js';
import { ClientService } from '../../../../core/services/client.service';
import { GlobalDataService } from '../../../../core/services/global-data.service';

declare const KTSelect: any;

@Component({
  selector: 'app-add-client',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent implements AfterViewInit, OnInit {
  //  code for the dropdowns 
  @ViewChild('businessTypeSelect') businessTypeSelect!: ElementRef;
  @ViewChild('subCategorySelect') subCategorySelect!: ElementRef;
  @ViewChild('countrySelect') countrySelect!: ElementRef;
  @ViewChild('stateSelect') stateSelect!: ElementRef;
  @ViewChild('citySelect') citySelect!: ElementRef;
  @ViewChild('contactCountrySelect') contactCountrySelect!: ElementRef;
  @ViewChild('businessContactCountrySelect') businessContactCountrySelect!: ElementRef;
  @ViewChild('accountTypeSelect') accountTypeSelect!: ElementRef;
  @ViewChild('currencySelect') currencySelect!: ElementRef;

  selectedBusinessTypeSelect: any;
  selectedSubCategorySelect: any;
  selectedContactCountrySelect: any;
  selectedBusinessContactCountrySelect: any;
  selectedAccountTypeSelect: any;
  selectedCurrencySelect: any;
  //  code for the dropdowns end

  // country, state, city selects
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  selectedCountryCode: string = '';
  selectedStateCode: string = '';
  countries: ICountry[] = [];
  states: any[] = [];
  cities: any[] = [];

  form!: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';
  businessTypes = [
    { value: 'Advertising', label: 'Advertising' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Other', label: 'Other' }
  ];

  subCategoryOptions: any = [];

  countryCodes: any = [];

  // Removed default India fallback toggle - this component will no longer auto-select +91

  currencies: any[] = [];

  // Phone number format hints
  contactNumberPlaceholder: string = 'Enter Contact Number';
  businessContactPlaceholder: string = 'Enter Business Contact';

  // Form progress tracking
  formProgress: number = 0;
  sectionsCompleted: number = 0;
  totalSections: number = 4;
  totalFields: number = 0;
  filledFields: number = 0;

  // (Removed client-specific fields tracking) 

  subCategoryMap: any = {
    Advertising: [
      { value: 'Social', label: 'Social Media' },
      { value: 'Creative', label: 'Creative' }
    ],
    Technology: [
      { value: 'Software', label: 'Software' },
      { value: 'IT', label: 'IT Services' }
    ],
    Healthcare: [
      { value: 'Pharma', label: 'Pharmaceutical' },
      { value: 'Clinic', label: 'Clinic' }
    ],
    Other: [
      { value: 'Other', label: 'Other' }
    ]
  };

  showInstagramCredentials: boolean = false;
  showFacebookCredentials: boolean = false;
  showGoogleMyBusinessCredentials: boolean = false;
  showGoogleCredentials: boolean = false;
  showLinkedInCredentials: boolean = false;
  showTiktokCredentials: boolean = false;
  showXCredentials: boolean = false;
  showYoutubeCredentials: boolean = false;
  showGoogleDriveCredentials: boolean = false;
  showpinterestCredentials: boolean = false;


  ktConfig = JSON.stringify({
    displayTemplate: `<div class="flex items-center gap-2"><span class="text-foreground">{{text}}</span></div>`,
    optionTemplate: `<div class="flex flex-col"><span class="text-foreground text-sm">{{text}}</span><span class="text-secondary text-xs mt-1">{{name}}</span></div>`,
    optionsClass: "kt-scrollable overflow-auto max-h-[250px]",
    searchAutofocus: true
  });

  getSelectOption(country: string, code: string) {
    return JSON.stringify({
      name: country,
      text: `${code}`
    });
  }


  ngAfterViewInit(): void {
    this.initializeSelects();
  }

  ngOnInit(): void {
    // Calculate initial progress
    this.calculateProgress();

    // Listen to form changes to update progress
    this.form.valueChanges.subscribe(() => {
      this.calculateProgress();
    });
  }

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
    ,
    private globalDataService: GlobalDataService
  ) {
    this.initializeForm();
    this.loadCountriesAndCodes();
    this.loadCurrencies();
    this.setupPhoneValidation();
  }
  get f() { return this.form.controls; }

  // Phone validation now lives in globalDataService (phoneValidatorFactory)

  initializeForm() {
    this.form = this.fb.group({
      clientfirstName: ['', [Validators.required]],
      clientLastName: ['', [Validators.required]],
      contactCountryCode: [''],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      businessName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      businessType: [''],
      businessSubCategory: [''],
      businessContactCountryCode: [''],
      businessContact: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      businessEmail: ['', [Validators.required, Validators.email]],
      assignedExecutive: [''],
      country: [''],
      state: [''],
      city: [''],
      address: [''],
      postcode: ['', [Validators.pattern(/^[0-9]{5,10}$/)]],
      businessWebsite: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
      isVip: [false],
      businessDescription: [''],
      // Accounting fields
      accounteHolderName: ['', [Validators.pattern(/^[A-Za-z\s]{2,100}$/)]],
      accountNumber: ['', [Validators.pattern(/^[A-Za-z0-9\-]{6,30}$/)]],
      accountType: [''],
      bankName: ['', [Validators.pattern(/^[A-Za-z0-9\s\-\.]{2,100}$/)]],
      branchName: ['', [Validators.pattern(/^[A-Za-z0-9\s\-\.]{0,100}$/)]],
      ifscCode: ['', [Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      swiftCode: ['', [Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)]],
      taxVatId: ['', [Validators.pattern(/^[A-Za-z0-9\-]{3,30}$/)]],
      currency: ['']
    });
  }


  // below code is for the contact number start
  setupPhoneValidation() {
    // Setup contact number validators and placeholder initially
    const contactCountryControl = this.form.get('contactCountryCode');
    const businessContactCountryControl = this.form.get('businessContactCountryCode');

    this.form.get('contactCountryCode')?.valueChanges.subscribe((value) => {
      const contactNumberControl = this.form.get('contactNumber');
      // Always enforce a numeric-only rule and required flag on contact number.
      // Only apply phone validation factory (E.164 correctness) when a country code is selected.
      const validators: any[] = [Validators.required, Validators.pattern(/^[0-9]+$/)];
      if (value) {
        validators.push(this.globalDataService.phoneValidatorFactory(this.form, 'contactCountryCode'));
      }
      contactNumberControl?.setValidators(validators);
      contactNumberControl?.updateValueAndValidity({ emitEvent: false });

      this.updatePhonePlaceholder(value, 'contact');
    });

    this.form.get('businessContactCountryCode')?.valueChanges.subscribe((value) => {
      const businessContactControl = this.form.get('businessContact');
      const validators: any[] = [Validators.required, Validators.pattern(/^[0-9]+$/)];
      if (value) {
        validators.push(this.globalDataService.phoneValidatorFactory(this.form, 'businessContactCountryCode'));
      }
      businessContactControl?.setValidators(validators);
      businessContactControl?.updateValueAndValidity({ emitEvent: false });

      this.updatePhonePlaceholder(value, 'business');
    });

    // Set initial validators once on component init
    const initialContactCountry = contactCountryControl?.value;
    const initialBusinessCountry = businessContactCountryControl?.value;
    const contactNumberControl = this.form.get('contactNumber');
    const businessContactControl = this.form.get('businessContact');
    const generalContactValidators: any[] = [Validators.required, Validators.pattern(/^[0-9]+$/)];
    if (initialContactCountry) {
      generalContactValidators.push(this.globalDataService.phoneValidatorFactory(this.form, 'contactCountryCode'));
    }
    contactNumberControl?.setValidators(generalContactValidators);

    const generalBusinessContactValidators: any[] = [Validators.required, Validators.pattern(/^[0-9]+$/)];
    if (initialBusinessCountry) {
      generalBusinessContactValidators.push(this.globalDataService.phoneValidatorFactory(this.form, 'businessContactCountryCode'));
    }
    businessContactControl?.setValidators(generalBusinessContactValidators);
    contactNumberControl?.updateValueAndValidity({ emitEvent: false });
    businessContactControl?.updateValueAndValidity({ emitEvent: false });
    this.updatePhonePlaceholder(initialContactCountry, 'contact');
    this.updatePhonePlaceholder(initialBusinessCountry, 'business');
  }

  updatePhonePlaceholder(countryCodeValue: string, type: 'contact' | 'business') {
    if (!countryCodeValue) {
      if (type === 'contact') {
        this.contactNumberPlaceholder = 'Enter Contact Number';
      } else {
        this.businessContactPlaceholder = 'Enter Business Contact';
      }
      return;
    }

    const parts = countryCodeValue.split(' - ');
    const countryCode = parts[1] as CountryCode;
    if (countryCode) {
      const nationalNumber = this.globalDataService.getExampleNumber(countryCode);
      if (nationalNumber) {
        if (type === 'contact') {
          this.contactNumberPlaceholder = `e.g., ${nationalNumber}`;
        } else {
          this.businessContactPlaceholder = `e.g., ${nationalNumber}`;
        }
      }
    }
  }

  // above code is for the contact number end

  // function for the dropdowns start
  initializeSelects(): void {
    setTimeout(() => {
      if (typeof KTSelect !== 'undefined') {
        if (this.businessTypeSelect?.nativeElement && !this.selectedBusinessTypeSelect) {
          this.selectedBusinessTypeSelect = new KTSelect(this.businessTypeSelect.nativeElement);
        }
        if (this.subCategorySelect?.nativeElement && !this.selectedSubCategorySelect) {
          this.selectedSubCategorySelect = new KTSelect(this.subCategorySelect.nativeElement);
        }
        if (this.countrySelect?.nativeElement && !this.selectedCountry) {
          this.selectedCountry = new KTSelect(this.countrySelect.nativeElement);
        }
        if (this.stateSelect?.nativeElement && !this.selectedState) {
          this.selectedState = new KTSelect(this.stateSelect.nativeElement);
        }
        if (this.citySelect?.nativeElement && !this.selectedCity) {
          this.selectedCity = new KTSelect(this.citySelect.nativeElement);
        }
        if (this.contactCountrySelect?.nativeElement && !this.selectedContactCountrySelect) {
          this.selectedContactCountrySelect = new KTSelect(this.contactCountrySelect.nativeElement);
        }
        if (this.businessContactCountrySelect?.nativeElement && !this.selectedBusinessContactCountrySelect) {
          this.selectedBusinessContactCountrySelect = new KTSelect(this.businessContactCountrySelect.nativeElement);
        }
        if (this.accountTypeSelect?.nativeElement && !this.selectedAccountTypeSelect) {
          this.selectedAccountTypeSelect = new KTSelect(this.accountTypeSelect.nativeElement);
        }
        if (this.currencySelect?.nativeElement && !this.selectedCurrencySelect) {
          this.selectedCurrencySelect = new KTSelect(this.currencySelect.nativeElement);
        }
      }
    }, 100);
  }

  onBusinessTypeChange(value: string) {
    this.subCategoryOptions = this.subCategoryMap[value] || [];
    if (this.form) {
      this.form.patchValue({ businessSubCategory: '' });
    }
    setTimeout(() => {
      if (this.subCategorySelect && this.selectedSubCategorySelect) {
        try { this.selectedSubCategorySelect.destroy(); } catch (e) { /* ignore */ }
        this.selectedSubCategorySelect = null;
      }
      this.initializeSelects();
    });
  }

  onCountryChange(countryCode: string) {
    this.selectedCountryCode = countryCode;
    this.selectedStateCode = '';
    this.states = [];
    this.cities = [];
    if (this.form) {
      this.form.patchValue({ state: '', city: '' });
    }

    if (countryCode) {
      this.states = this.globalDataService.getStatesOfCountry(countryCode);
    }
    setTimeout(() => {
      if (this.selectedState) {
        this.selectedState.destroy();
        this.selectedState = null;
      }
      if (this.selectedCity) {
        this.selectedCity.destroy();
        this.selectedCity = null;
      }
      this.initializeSelects();
    }, 150);
  }

  onStateChange(stateCode: string) {
    this.selectedStateCode = stateCode;
    this.cities = [];
    if (this.form) {
      this.form.patchValue({ city: '' });
    }

    if (stateCode && this.selectedCountryCode) {
      this.cities = this.globalDataService.getCitiesOfState(this.selectedCountryCode, stateCode);
    }

    setTimeout(() => {
      if (this.selectedCity) {
        this.selectedCity.destroy();
        this.selectedCity = null;
      }
      this.initializeSelects();
    }, 150);
  }

  initializeCountries() {
    this.countries = this.globalDataService.getCountries();
  }

  fetchCountryCodes() {
    this.countryCodes = this.globalDataService.getCountryCallingCodes();
  }

  initializeCurrencies() {
    this.currencies = this.globalDataService.getCurrencies();
  }

  // Helper to load countries and country codes
  loadCountriesAndCodes() {
    this.initializeCountries();
    this.fetchCountryCodes();
  }

  loadCurrencies() {
    this.initializeCurrencies();
  }

  toggleCredentials(platform: string) {
    if (platform === 'instagram') {
      this.showInstagramCredentials = !this.showInstagramCredentials;
    } else if (platform === 'facebook') {
      this.showFacebookCredentials = !this.showFacebookCredentials;
    } else if (platform === 'google-my-business') {
      this.showGoogleMyBusinessCredentials = !this.showGoogleMyBusinessCredentials;
    } else if (platform === 'google') {
      this.showGoogleCredentials = !this.showGoogleCredentials;
    } else if (platform === 'linkedin') {
      this.showLinkedInCredentials = !this.showLinkedInCredentials;
    } else if (platform === 'tiktok') {
      this.showTiktokCredentials = !this.showTiktokCredentials;
    } else if (platform === 'X') {
      this.showXCredentials = !this.showXCredentials;
    } else if (platform === 'youtube') {
      this.showYoutubeCredentials = !this.showYoutubeCredentials;
    } else if (platform === 'google-drive') {
      this.showGoogleDriveCredentials = !this.showGoogleDriveCredentials;
    } else if (platform === 'pinterest') {
      this.showpinterestCredentials = !this.showpinterestCredentials;
    }

  }


  calculateProgress() {
    const formValue = this.form.value;
    const allFields = Object.keys(formValue);
    this.totalFields = allFields.length;

    // Count filled fields (non-empty values)
    this.filledFields = allFields.filter(key => {
      const value = formValue[key];
      return value !== null && value !== undefined && value !== '';
    }).length;

    // Calculate overall progress percentage
    this.formProgress = Math.round((this.filledFields / this.totalFields) * 100);

    // Calculate sections completed
    const personalDetailsFields = ['clientfirstName', 'clientLastName', 'email', 'contactCountryCode', 'contactNumber'];
    const businessDetailsFields = ['businessName', 'businessEmail', 'businessContactCountryCode', 'businessContact', 'businessType', 'businessSubCategory', 'businessWebsite'];
    const addressDetailsFields = ['country', 'state', 'city', 'postcode', 'address'];
    const accountingDetailsFields = ['accounteHolderName', 'accountNumber', 'bankName', 'branchName', 'ifscCode', 'swiftCode', 'accountType', 'currency', 'taxVatId'];

    this.sectionsCompleted = 0;

    // Check Personal Details section
    if (this.isSectionComplete(personalDetailsFields, formValue)) {
      this.sectionsCompleted++;
    }

    // Check Business Details section
    if (this.isSectionComplete(businessDetailsFields, formValue)) {
      this.sectionsCompleted++;
    }

    // Check Address Details section
    if (this.isSectionComplete(addressDetailsFields, formValue)) {
      this.sectionsCompleted++;
    }

    // Check Accounting Details section (optional fields, check at least 3 fields)
    const accountingFilled = accountingDetailsFields.filter(field => {
      const value = formValue[field];
      return value !== null && value !== undefined && value !== '';
    }).length;
    if (accountingFilled >= 3) {
      this.sectionsCompleted++;
    }

    // (no client-specific fields calculation; removed as requested)
  }

  isSectionComplete(fields: string[], formValue: any): boolean {
    return fields.every(field => {
      const value = formValue[field];
      return value !== null && value !== undefined && value !== '';
    });
  }

  // Badge label for onboarding status
  get badgeLabel(): string {
    return this.formProgress === 100 ? 'Completed' : 'In Progress';
  }

  // Badge class to show green when complete
  get badgeClass(): string {
    return this.formProgress === 100 ? 'kt-badge kt-badge-sm kt-badge-success kt-badge-outline' : 'kt-badge kt-badge-sm kt-badge-primary kt-badge-outline';
  }

  get onboardingSubtext(): string {
    return this.formProgress === 100 ? 'All required client fields completed.' : 'Complete required fields to get the best experience.';
  }

  onSubmit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const selectedContactCountry = this.form.get('contactCountryCode')?.value;
    let contactCountryCode = "";
    let contactDefaultCountry = "";
    if (selectedContactCountry) {
      const parts = selectedContactCountry.split(" - ");
      contactCountryCode = parts[0];
      contactDefaultCountry = parts[1];
    }

    const selectedBusinessContactCountry = this.form.get('businessContactCountryCode')?.value;
    let businessContactCountryCode = "";
    let businessContactDefaultCountry = "";
    if (selectedBusinessContactCountry) {
      const parts = selectedBusinessContactCountry.split(" - ");
      businessContactCountryCode = parts[0];
      businessContactDefaultCountry = parts[1];
    }

    const contactNumber = this.form.value.contactNumber;
    const businessContact = this.form.value.businessContact;

    let formattedContactNumber = contactCountryCode + contactNumber;
    let formattedBusinessContact = businessContactCountryCode + businessContact;
    if (contactDefaultCountry && contactNumber) {
      const formatted = this.globalDataService.formatPhoneE164(contactNumber, contactDefaultCountry as CountryCode);
      if (formatted) formattedContactNumber = formatted;
    }
    if (businessContactDefaultCountry && businessContact) {
      const formatted = this.globalDataService.formatPhoneE164(businessContact, businessContactDefaultCountry as CountryCode);
      if (formatted) formattedBusinessContact = formatted;
    }

    let storedUserId = localStorage.getItem('user_id');
    let storedCompanyId = localStorage.getItem('company_id');
    const clientDataRaw = localStorage.getItem('clientData');
    if (clientDataRaw) {
      try {
        const clientData = JSON.parse(clientDataRaw);
        if (clientData) {
          storedUserId = storedUserId || clientData.userId || clientData.id;
          storedCompanyId = storedCompanyId || clientData.companyId;
        }
      } catch (e) {
      }
    }

    const formData = {
      ...this.form.value,
      userId: storedUserId || localStorage.getItem('user_id') || localStorage.getItem('userId'),
      companyId: storedCompanyId || localStorage.getItem('company_id') || localStorage.getItem('companyId'),
      contact: formattedContactNumber,
      businessContact: formattedBusinessContact,
      businessSubCategory: this.form.value.businessSubCategory ? [this.form.value.businessSubCategory] : [],
      countryCode: contactDefaultCountry,
    };

    this.clientService.addClientDetails(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/agency/agency-clients/client-list']);
      },
      error: (error) => {
        console.error('Error adding client', error);
        this.isLoading = false;
        this.errorMessage = error?.error?.message || error?.message || 'Failed to add client. Please try again.';
      }
    });
  }
}

