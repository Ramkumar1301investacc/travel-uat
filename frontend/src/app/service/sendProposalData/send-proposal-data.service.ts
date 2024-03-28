import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendProposalDataService {

  constructor(
    private http: HttpClient
  ) { }

  private URL = "http://localhost:8080/api/v1/requestId";

  sendProposalData(data: any) {
    return this.http.post(this.URL, data)
  }

}
