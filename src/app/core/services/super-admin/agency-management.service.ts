import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SuperAdminApiService } from "./super-admin-api.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AgencyManagementService {
    constructor(private httpClient: HttpClient) { }

    getAllCategory(): Observable<any> {
        return this.httpClient.get(SuperAdminApiService.GetAllCategoryURL);
    }
    addCategory(data: any): Observable<any> {
        return this.httpClient.post(SuperAdminApiService.AddCategoryURL, data);
    }
    updateCategoty(data: any, id: any) {
        return this.httpClient.post(SuperAdminApiService.UpdateCategoryByIdURL, data);
    }
    removeCategoryUsingId(id: any) {
        return this.httpClient.get(SuperAdminApiService.UpdateCategoryByIdURL + id);
    }
}