import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPlansService {

  // corporatePlans : any; // storing corporate plans data
  // studentPlans : any; // storing student plans data

  plans : any; //storing plans data coming from api

  constructor(
    private http: HttpClient
  ) { }

  getCorporatePlans() {
    return this.http.get('http://localhost:8080/api/v1/corporatePlan')
  }

  getStudentPlans() {
    return this.http.get('http://localhost:8080/api/v1/getStudentsTravelPlan')
  }
}
