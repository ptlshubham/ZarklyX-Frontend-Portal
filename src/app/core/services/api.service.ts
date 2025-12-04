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
  public static RegisterUserURL: string = ApiService.HOST_URL + '/user/register/start';
  public static VerifyRegisterOtpURL: string = ApiService.HOST_URL + '/user/register/verify-otp';
  public static RegisterCategoryURL: string = ApiService.HOST_URL + '/user/register/categories'; // step 1
  public static RegisterUserTypeURL: string = ApiService.HOST_URL + '/user/register/user-type'; // step 2
  public static RegisterCompanyDetailsURL: string = ApiService.HOST_URL + '/user/register/company'; // step 3
  public static RegisterFinalStepURL: string = ApiService.HOST_URL + '/user/register/final'; // step 4& 5
  public static ResendOtpURL: string = ApiService.HOST_URL + '/otp/resend-otp'
  public static GoogleLoginURL: string = ApiService.HOST_URL + '/user/auth/google-login'
  public static GoogleSignupURL: string = ApiService.HOST_URL + '/user/auth/google-signup'


  public static GoogleVerifyURL: string = ApiService.HOST_URL + '/user/auth/verify-google'

  // main login urls
  public static MainLoginURL: string = ApiService.HOST_URL + '/user/login'
  public static VerifyLoginOtpURL: string = ApiService.HOST_URL + '/user/login/verify-otp'
  public static SendLoginOtpURL: string = ApiService.HOST_URL + '/otp/send-otp'

}
