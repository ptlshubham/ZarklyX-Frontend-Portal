import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as currencyCodes from 'currency-codes';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const KTSelect: any;

@Component({
    selector: 'app-company-profile',
    imports: [ReactiveFormsModule],
    templateUrl: './company-profile.component.html',
    styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent implements AfterViewInit {
    // searchable dropdown start
    @ViewChild('currency') currency!: ElementRef;
    @ViewChild('countrySelect') countrySelect!: ElementRef;
    @ViewChild('stateSelect') stateSelect!: ElementRef;
    @ViewChild('citySelect') citySelect!: ElementRef;
    @ViewChild('taxationType') taxationType!: ElementRef;

    private selectedCurrency: any;
    private selectedCountry: any;
    private selectedState: any;
    private selectedCity: any;
    private selectedTaxationType: any;

    currencies: any[] = [];
    countries: ICountry[] = [];
    states: IState[] = [];
    cities: ICity[] = [];

    selectedCountryCode: string = '';
    selectedStateCode: string = '';
    taxationTypes: any = [
        { code: 'GST', name: 'Goods and Services Tax' },
        { code: 'VAT', name: 'Value Added Tax' },
        { code: 'SALES_TAX', name: 'Sales Tax' },
        { code: 'EXCISE', name: 'Excise Duty' },
        { code: 'CUSTOMS', name: 'Customs Duty' }
    ];

    form!: FormGroup;
    submitted = false;
    public initializeSelects() {
        setTimeout(() => {
            if (typeof KTSelect !== 'undefined') {
                if (this.currency?.nativeElement && !this.selectedCurrency) {
                    this.selectedCurrency = new KTSelect(this.currency.nativeElement);
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
                if (this.taxationType?.nativeElement && !this.selectedTaxationType) {
                    this.selectedTaxationType = new KTSelect(this.taxationType.nativeElement);
                }
            }
        }, 100);
    }
    // searchable dropdown end


    constructor(private fb: FormBuilder) {
        this.initializeCurrencies();
        this.initializeCountries();
        this.initializeForm();
    }


    private initializeCurrencies() {
        this.currencies = currencyCodes.codes().map(code => ({
            code: code,
            name: currencyCodes.code(code)?.currency || code
        })).sort((a, b) => a.name.localeCompare(b.name));
    }



    private initializeForm() {
        this.form = this.fb.group({
            companyName: ['KeenThemes'],
            currency: [''],
            country: [''],
            state: [''],
            city: [''],
            address: [''],
            pincode: [''],
            email: ['', [Validators.email]],
            phoneNumber: [''],
            taxationType: [''],
            gstin: ['', [Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)]],
            serviceTaxNumber: [''],
            contactName: [''],
            website: ['', [Validators.pattern(/^(https:\/\/|www\.|)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/)]],
            taxInclusiveRate: [false]
        });
    }

    private initializeCountries() {
        this.countries = Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name));
    }

    onCountryChange(countryCode: string) {
        this.selectedCountryCode = countryCode;
        this.selectedStateCode = '';
        this.states = [];
        this.cities = [];

        if (countryCode) {
            this.states = State.getStatesOfCountry(countryCode).sort((a, b) => a.name.localeCompare(b.name));
        }

        // Reinitialize state and city selects
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

        if (stateCode && this.selectedCountryCode) {
            this.cities = City.getCitiesOfState(this.selectedCountryCode, stateCode).sort((a, b) => a.name.localeCompare(b.name));
        }

        // Reinitialize city select
        setTimeout(() => {
            if (this.selectedCity) {
                this.selectedCity.destroy();
                this.selectedCity = null;
            }
            this.initializeSelects();
        }, 150);
    }

    ngAfterViewInit() {
        this.initializeSelects();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        console.log(this.form.value);
    }

}