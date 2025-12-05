import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(
        private router: Router,
        public http: HttpClient,
        public apiService: ApiService
    ) { }

    addClientDetails(data: any) {
        return this.http.post(ApiService.AddClientDetailsURL, data);
    }
    getAllClientsByCompanyId(companyId: any) {
        return this.http.get(ApiService.GetAllClientsByCIdURL + companyId);
    }


}