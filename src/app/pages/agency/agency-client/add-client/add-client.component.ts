import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Country, State, City, ICity, ICountry, IState } from 'country-state-city';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

declare const KTSelect: any;

@Component({
  selector: 'app-add-client',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent implements AfterViewInit {
  //  code for the dropdowns 
  @ViewChild('businessTypeSelect') businessTypeSelect!: ElementRef;
  @ViewChild('subCategorySelect') subCategorySelect!: ElementRef;
  @ViewChild('countrySelect') countrySelect!: ElementRef;
  @ViewChild('stateSelect') stateSelect!: ElementRef;
  @ViewChild('citySelect') citySelect!: ElementRef;
  @ViewChild('contactCountrySelect') contactCountrySelect!: ElementRef;
  @ViewChild('businessContactCountrySelect') businessContactCountrySelect!: ElementRef;
  @ViewChild('accountTypeSelect') accountTypeSelect!: ElementRef;

  selectedBusinessTypeSelect: any;
  selectedSubCategorySelect: any;
  selectedContactCountrySelect: any;
  selectedBusinessContactCountrySelect: any;
  selectedAccountTypeSelect: any;
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
  businessTypes = [
    { value: 'Advertising', label: 'Advertising' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Other', label: 'Other' }
  ];

  subCategoryOptions: any = [];

  countryCodes: any = [];

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
    displayTemplate: `<div class="flex items-center gap-2">
                      <span class="text-foreground">{{text}}</span>
                    </div>`,
    optionTemplate: `<div class="flex items-center gap-2">
              <span class="text-foreground">{{text}} {{name}}</span>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"
                      class="size-3.5 ms-auto hidden text-primary kt-select-option-selected:block">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>`,
    optionsClass: "kt-scrollable overflow-auto max-h-[250px]"
  });

  ngAfterViewInit(): void {
    this.initializeSelects();
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.initializeForm();
    this.initializeCountries();
    this.fetchCountryCodes();
  }
  get f() { return this.form.controls; }

  private initializeForm() {
    this.form = this.fb.group({
      clientFirstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      clientLastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      contactCountryCode: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      businessName: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      email: ['', [Validators.required, Validators.email]],
      businessType: ['', Validators.required],
      subCategory: ['', Validators.required],
      businessContactCountryCode: ['', Validators.required],
      businessContact: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      businessEmail: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      assignedExecutive: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]{2,50}$/)]],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,10}$/)]],
      website: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
      isVip: [''],
      businessdescription: [''],
      // Accounting fields
      accountHolderName: ['', [Validators.pattern(/^[A-Za-z\s]{2,100}$/)]],
      accountNumber: ['', [Validators.pattern(/^[A-Za-z0-9\-]{6,30}$/)]],
      accountType: [''],
      bankName: ['', [Validators.pattern(/^[A-Za-z0-9\s\-\.]{2,100}$/)]],
      branchName: ['', [Validators.pattern(/^[A-Za-z0-9\s\-\.]{0,100}$/)]],
      ifscCode: ['', [Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      swiftCode: ['', [Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)]],
      taxId: ['', [Validators.pattern(/^[A-Za-z0-9\-]{3,30}$/)]],
      currency: ['']
    });
  }

  // function for the dropdowns start
  public initializeSelects(): void {
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
      }
    }, 100);
  }
  // function for the dropdowns end

  // country state and city dropdowns using library start
  onBusinessTypeChange(value: string) {
    this.subCategoryOptions = this.subCategoryMap[value] || [];
    if (this.form) {
      this.form.patchValue({ subCategory: '' });
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
      this.states = State.getStatesOfCountry(countryCode).sort((a, b) => a.name.localeCompare(b.name));
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
      this.cities = City.getCitiesOfState(this.selectedCountryCode, stateCode).sort((a, b) => a.name.localeCompare(b.name));
    }

    setTimeout(() => {
      if (this.selectedCity) {
        this.selectedCity.destroy();
        this.selectedCity = null;
      }
      this.initializeSelects();
    }, 150);
  }

  private initializeCountries() {
    this.countries = Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name));
  }

  fetchCountryCodes() {
    this.http.get<any[]>("https://restcountries.com/v3.1/all?fields=name,cca2,idd,timezones")
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
        }).filter(x => x.code !== "");
      });
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

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log('Add Client Form Values:', this.form.value);
  }

}

