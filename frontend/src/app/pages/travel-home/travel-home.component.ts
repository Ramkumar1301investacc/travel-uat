import { Component } from '@angular/core';
import { GetPlansService } from 'src/app/service/getPlans/get-plans.service';

@Component({
  selector: 'app-travel-home',
  templateUrl: './travel-home.component.html',
  styleUrls: ['./travel-home.component.css']
})
export class TravelHomeComponent {
  sub: any;
  constructor(
    private plans: GetPlansService
  ) { }

  callStudentPlans() {
    this.sub = this.plans.getStudentPlans().subscribe((data) => {
      this.plans.plans = data; // populating the variable from the service itself
      // console.log(this.plans.studentPlans.map((data: { pplan: any; }) => data.pplan))
    })
  }

  callCorporatePlans() {
    this.sub = this.plans.getCorporatePlans().subscribe((data) => {
      this.plans.plans = data; // populating the variable with corporate plans
      console.log(this.plans.plans.map((data: { pplan: any; }) => data.pplan))
    })
  }
}
