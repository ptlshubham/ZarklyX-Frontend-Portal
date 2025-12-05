import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Country, State, City, ICountry, IState, ICity } from 'country-state-city';
import { parsePhoneNumberFromString, CountryCode, getCountries, getCountryCallingCode, getExampleNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';
import * as currencyCodes from 'currency-codes';

@Injectable({ providedIn: 'root' })
export class GlobalDataService {
    constructor() { }

    getCountries(): ICountry[] {
        return Country.getAllCountries().sort((a, b) => a.name.localeCompare(b.name));
    }

    getStatesOfCountry(countryCode: string): IState[] {
        if (!countryCode) return [];
        return State.getStatesOfCountry(countryCode).sort((a, b) => a.name.localeCompare(b.name));
    }

    getCitiesOfState(countryCode: string, stateCode: string): ICity[] {
        if (!countryCode || !stateCode) return [];
        return City.getCitiesOfState(countryCode, stateCode).sort((a, b) => a.name.localeCompare(b.name));
    }

    getCountryCallingCodes(): Array<{ id: number; country: string; code: string }> {
        const countries = getCountries();
        return countries
            .map((countryCode, index) => {
                try {
                    const callingCode = getCountryCallingCode(countryCode as CountryCode);
                    return {
                        id: index,
                        country: countryCode,
                        code: `+${callingCode}`,
                    };
                } catch (error) {
                    return null;
                }
            })
            .filter((x) => x !== null) as Array<{ id: number; country: string; code: string }>;
    }

    getExampleNumber(countryCode: CountryCode) {
        try {
            const exampleNumber = getExampleNumber(countryCode, examples);
            return exampleNumber ? exampleNumber.nationalNumber : null;
        } catch (error) {
            return null;
        }
    }

    isValidPhoneNumber(phone: string, countryCode?: CountryCode): boolean {
        if (!phone) return false;
        if (!countryCode) {
            // rough check: digits only
            return /^[0-9]+$/.test(phone);
        }
        try {
            const phoneObj = parsePhoneNumberFromString(phone, countryCode);
            return !!phoneObj && phoneObj.isValid();
        } catch (error) {
            return false;
        }
    }

    formatPhoneE164(phone: string, countryCode?: CountryCode): string | null {
        if (!phone) return null;
        if (!countryCode) {
            // attempt naive format by returning phone as-is
            return phone;
        }
        try {
            const phoneObj = parsePhoneNumberFromString(phone, countryCode);
            if (!phoneObj) return null;
            return phoneObj.number; // E.164 format
        } catch (error) {
            return null;
        }
    }

    // Returns an Angular validator function which validates phone using a related country code control in the same form
    phoneValidatorFactory(form: FormGroup, countryCodeControlName: string) {
        return (control: AbstractControl): ValidationErrors | null => {
            const phoneNumber = control.value;
            if (!phoneNumber) return null;
            const countryCodeValue = form?.get(countryCodeControlName)?.value;
            if (!countryCodeValue) {
                if (phoneNumber && phoneNumber.toString().trim() !== '') {
                    return { missingCountryCode: true };
                }
                return null;
            }
            const parts = countryCodeValue.split(' - ');
            const countryCode = parts[1] as CountryCode;
            if (!countryCode) return null;
            const isValid = this.isValidPhoneNumber(phoneNumber, countryCode);
            return isValid ? null : { invalidPhone: true };
        };
    }

    getCurrencies(): Array<{ value: string; label: string }> {
        return (currencyCodes.data as any[]).map((item: any) => ({ value: item.code, label: `${item.code} - ${item.currency}` }));
    }
}
