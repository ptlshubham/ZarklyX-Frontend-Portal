import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class SuperAdminApiService {
    public static HOST_URL: string = ApiService.HOST_URL;

    constructor() {
    }

    httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }


    // Category Crud Operation
    public static GetAllCategoryURL: string = SuperAdminApiService.HOST_URL + '/category/getAllCategory';
    public static AddCategoryURL: string = SuperAdminApiService.HOST_URL + '/category/addCategory';
    public static UpdateCategoryByIdURL: string = SuperAdminApiService.HOST_URL + '/category/updateCategoryById';
    public static RemoveCategoryByIdURL: string = SuperAdminApiService.HOST_URL + '/category/removeById/';


}