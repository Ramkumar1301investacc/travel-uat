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

  private URL = 'http://localhost:8080/api/v1/getPlanDetails';

  getPlanDetails()
  {
    return this.http.post(this.URL, this.plans)
  }
}
