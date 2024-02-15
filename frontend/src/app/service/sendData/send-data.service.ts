import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPlansService } from '../getPlans/get-plans.service';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor(
    private http: HttpClient,
    private plans: GetPlansService
  ) { }

  private URL = 'http://localhost:8080/api/v1/CalculatePremium';
  
  sendData(data: any, plans: any) {
    const requestData = {data, plans}
    console.log('Service Data', requestData)
    return this.http.post(this.URL, requestData);
  }

}
