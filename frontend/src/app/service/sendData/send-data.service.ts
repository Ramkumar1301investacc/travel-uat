import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor(
    private http: HttpClient
  ) { }

  private URL = 'http://localhost:8080/api/v1/CalculatePremium'
  sendData(data: any) {
    console.log('Service Data', data)
    return this.http.post(this.URL, data);
  }

}
