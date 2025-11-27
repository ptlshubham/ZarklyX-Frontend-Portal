import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:9005";
  // public static HOST_URL: string = "https://api.fosterx.co";
  
  constructor() {
  }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // company register URL
  public static registerUserURL:string = ApiService.HOST_URL + '/user/register/start';
  public static verifyRegisterOtpURL:string = ApiService.HOST_URL + '/user/register/verify-otp';
  public static registerCategoryURL:string = ApiService.HOST_URL + '/user/register/categories'; // step 1
  public static registerUserTypeURL:string = ApiService.HOST_URL + '/user/register/user-type'; // step 2
  public static registerCompanyDetailsURL:string = ApiService.HOST_URL + '/user/register/company'; // step 3
  public static registerFinalStepURL:string = ApiService.HOST_URL + '/user/register/final'; // step 4& 5
  public static resendOtpURL:string = ApiService.HOST_URL + '/otp/resend-otp'
  
  // main login urls
  public static mainLoginURL : string = ApiService.HOST_URL + '/user/login'

}
