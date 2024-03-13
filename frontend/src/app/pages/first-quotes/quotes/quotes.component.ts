import { Component } from '@angular/core';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { FiltersService } from 'src/app/service/filters/filters.service';
import { GetDataService } from 'src/app/service/getData/get-data.service';
import { GetPlansService } from 'src/app/service/getPlans/get-plans.service';
import { PlanDetailsService } from 'src/app/service/planDetails/plan-details.service';
import { SendDataService } from 'src/app/service/sendData/send-data.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {

  sumInsuredValues = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 750000]
  loading: boolean = true;
  pData: any; //plans name
  pDetails: any; //plans details
  pFilterData: any; // filtered plan name
  pFilteredPlanDetails: any //filtered plan details
  medicalExpenses: any; // store medical expense data
  passportExpense: any; // store passport expenses
  baggageExpense: any; // store baaggage expenses
  sub: any;
  primeAcePlans: any;
  sumInsured: any = '';
  finalFormData: any;
  filteredPlans: any;
  travelPlanname: any //to store single travel plan name
  constructor(
    private getPolicyDetails: GetDataService,
    private filters: FiltersService,
    private destDataService: DestAgeNumService,
    private getPlans: GetPlansService,
    private sendTravelData: SendDataService,
    private getPlanDetails: PlanDetailsService
  ) { }

  filterData(plantype: string, planSubType: string) {
    this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes(plantype) })
    this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes(plantype) && plan.planname.includes(planSubType) })
    this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes(plantype) && plan.pbenefits.includes('Medical') && plan.planname.includes(planSubType) })
    this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes(plantype) && plan.pbenefits.includes('Baggage') && plan.planname.includes(planSubType) })
    this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes(plantype) && plan.pbenefits.includes('Passport') && plan.planname.includes(planSubType) })
  }

  onItemChange(e: any) {
    this.filters.sumInsuredAmount = e.target.value;

    if (this.filters.sumInsuredAmount == 50000) {
      this.filterData('Standard', 'Student')
    }

    else if (this.filters.sumInsuredAmount == 100000) {
      this.filterData('Silver', 'Student')
    }

    else if (this.filters.sumInsuredAmount == 200000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Gold') && !plan.pTravelPremiumIn_inout.ptravelplan.includes('Super') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Gold') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Gold') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Gold') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Gold') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })
      console.log('Filtered Data', this.pFilterData);
      console.log('Filtered plan details', this.pFilteredPlanDetails)
    }

    else if (this.filters.sumInsuredAmount == 300000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Platinum') && !plan.pTravelPremiumIn_inout.ptravelplan.includes('Super') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })
      console.log('Filtered Data', this.pFilterData);
      console.log('Filtered plan details', this.pFilteredPlanDetails)
    }

    else if (this.filters.sumInsuredAmount == 500000) {
      this.filterData('Super Gold', 'Student')
    }

    else if (this.filters.sumInsuredAmount == 750000) {
      this.filterData('Super Platinum', 'Student')
    }
  }

  onBuyPolicy(planName: any) {
    console.log(this.travelPlanname = planName); //storing in local variable
    this.getPlanDetails.singlePlanName = planName; // storing in service variable
    this.getPlanDetails.getSinglePlanDetails(this.travelPlanname).subscribe(response => {
      this.getPlanDetails.singlePlanDetails = response; console.log('In quotes component', this.getPlanDetails.singlePlanDetails)
    })
  }

  ngOnInit() {

    this.sendTravelData.sendData(this.destDataService.getDestData(), this.getPlans.plans)
      .subscribe(response => { this.pData = response; console.log(this.pData); this.loading = false; this.loadFirstData() },
        error => { console.log(error) })

    // this.pData = this.getPolicyDetails.policyData;
    // this.getPlanDetails.getPlanDetails().subscribe(response => { this.pDetails = response; console.log('Get plan details', response) }, error => { console.log(error) })
    this.getPlanDetails.getPlanDetails().subscribe(response => { this.pDetails = response; }, error => { console.log(error) })
  }

  loadFirstData() {

    if (this.filters.planType === 'Student') {
      this.filterData('Standard', 'Student');
    }
    else if (this.filters.planType === 'Corporate') {
      this.filterData('30', 'Corporate');
    }
    
  }
}

