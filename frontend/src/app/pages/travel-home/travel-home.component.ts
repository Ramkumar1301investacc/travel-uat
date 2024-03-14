import { Component } from '@angular/core';
import { FiltersService } from 'src/app/service/filters/filters.service';
import { GetPlansService } from 'src/app/service/getPlans/get-plans.service';

@Component({
  selector: 'app-travel-home',
  templateUrl: './travel-home.component.html',
  styleUrls: ['./travel-home.component.css']
})
export class TravelHomeComponent {
  sub: any;
  temp: any;
  constructor(
    private plans: GetPlansService,
    private planFilters: FiltersService
  ) { }

  callStudentPlans() {
    this.sub = this.plans.getStudentPlans().subscribe((data) => {
      this.plans.plans = data; // populating the variable from the service itself
      console.log(this.plans.plans.map((data: { pplan: any; }) => data.pplan))
    })
    this.planFilters.planType = 'Student';
  }

  callCorporatePlans() {
    this.sub = this.plans.getCorporatePlans().subscribe((data) => {
      this.temp = data;
      this.plans.plans = this.temp.slice(2); // populating the variable with corporate plans
      console.log(this.plans.plans.map((data: { pplan: any; }) => data.pplan))
    })
    this.planFilters.planType = 'Corporate';
  }
}
