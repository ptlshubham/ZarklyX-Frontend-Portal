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


  public static loginURL:string = ApiService.HOST_URL + '/keryar/DeleteTestimonial/';

}
