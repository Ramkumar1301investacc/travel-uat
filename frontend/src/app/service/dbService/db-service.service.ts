import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DestAgeNumService } from '../dest-age-num.service';
import { FormDataService } from '../form-data.service';


@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(
    private http: HttpClient,
    private getTravellerData: DestAgeNumService,
    private getPropsalFormData:FormDataService
  ) { }

  private apiURL = 'http://localhost:8080'

  sendTravellerDetails()
  {
    return this.http.post(this.apiURL+'/addUserDetails', this.getTravellerData.destData)
  }

  sendProposalFormDetails(){
    return this.http.post(this.apiURL+'/insertProposalCustomerDetails',this.getPropsalFormData.formData)
  }
}
