import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class ClientAuthService {
    constructor(private router: Router,
        public http: HttpClient,
        public apiService: ApiService
    ) { }

    startClientSignup(payload: any) {
        return this.http.post<any>(ApiService.ClientSignupLoginURL, payload);
    }

    verifyClientSignupOtp(payload: any) {
        return this.http.post<any>(ApiService.ClientSignupVerifyOTPLoginURL, payload);
    }
}

