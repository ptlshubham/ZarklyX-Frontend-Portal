import { HttpClient } from "@angular/common/http";
import { SuperAdminApiService } from "./super-admin-api.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SignupSetting {
    constructor(private httpClient: HttpClient) { }

    getAllCategory(): Observable<any> {
        return this.httpClient.get(SuperAdminApiService.GetAllCategoryURL);
    }
    addCategory(data: any): Observable<any> {
        return this.httpClient.post(SuperAdminApiService.AddCategoryURL, data);
    }
    updateCategoty(data: any): Observable<any> {
        return this.httpClient.post(SuperAdminApiService.UpdateCategoryByIdURL, data);
    }
    removeCategoryUsingId(id: any) {
        return this.httpClient.get(SuperAdminApiService.RemoveCategoryByIdURL + id);
    }

    // PremiumFeatures
    getAllPremiumFeatures(): Observable<any> {
        return this.httpClient.get(SuperAdminApiService.GetAllPremiumFeaturesURL);
    }
    addPremiumFeature(data: any): Observable<any> {
        return this.httpClient.post(SuperAdminApiService.AddPremiumFeaturesURL, data);
    }
    updatePremiumFeaturesUsingId(data: any): Observable<any> {
        return this.httpClient.post(SuperAdminApiService.UpdatePremiumFeaturesByIdURL, data);
    }
    removePremiumFeatureUsingId(id: any) {
        return this.httpClient.get(SuperAdminApiService.RemovePremiumFeaturesByIdURL + id);
    }
}