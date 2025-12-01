import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SuperAdminApiService } from "./super-admin-api.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AgencyManagementService {
    constructor(private httpClient: HttpClient) { }

}