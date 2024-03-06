import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPlansService } from '../getPlans/get-plans.service';

@Injectable({
  providedIn: 'root'
})
export class PlanDetailsService {

  constructor(
    private http: HttpClient,
    private plans: GetPlansService
  ) { }

  singlePlanName : any;
  singlePlanDetails : any

  private URL = 'http://localhost:8080/api/v1/getPlanDetails';
  private URL2 = 'http://localhost:8080/api/v2/getPlanDetails';
  private singlePlanURL = 'http://localhost:8080/api/v1/getSinglePlanDetails';

  getPlanDetails()
  {
    // return this.http.post(this.URL, this.plans)
    return this.http.get(this.URL2);
  }

  getSinglePlanDetails(planName : any)
  {
    console.log('Service Plan name', planName)
    return this.http.post(this.singlePlanURL, {planName})
  }
}
