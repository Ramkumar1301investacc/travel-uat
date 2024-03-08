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

  onItemChange(e: any) {
    this.filters.sumInsuredAmount = e.target.value;

    if (this.filters.sumInsuredAmount == 50000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Standard') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })
    }
    else if (this.filters.sumInsuredAmount == 100000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Silver') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Silver') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Silver') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Silver') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Silver') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })

    }
    else if (this.filters.sumInsuredAmount == 200000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Gold') && !plan.pTravelPremiumIn_inout.ptravelplan.includes('Super') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })

    }
    else if (this.filters.sumInsuredAmount == 300000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Platinum') && !plan.pTravelPremiumIn_inout.ptravelplan.includes('Super') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Platinum') && !plan.planname.includes('Super') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })

    }
    else if (this.filters.sumInsuredAmount == 500000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Super Gold') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Gold') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Gold') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Gold') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Gold') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })

    }
    else if (this.filters.sumInsuredAmount == 750000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Super Platinum') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Platinum') && plan.planname.includes('Student') })
      this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Platinum') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
      this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Platinum') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
      this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Super Platinum') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })

      console.log(this.pFilteredPlanDetails)
    }
  }

  onBuyPolicy(planName: any) {
    console.log(this.travelPlanname = planName); //storing in local variable
    this.getPlanDetails.singlePlanName = planName; // storing in service variable
    this.getPlanDetails.getSinglePlanDetails(this.travelPlanname).subscribe(response => {
      this.getPlanDetails.singlePlanDetails = response; console.log('In quotes component',this.getPlanDetails.singlePlanDetails)
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
    this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Standard') })
    this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.planname.includes('Student') })
    this.medicalExpenses = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.pbenefits.includes('Medical') && plan.planname.includes('Student') })
    this.baggageExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.pbenefits.includes('Baggage') && plan.planname.includes('Student') })
    this.passportExpense = this.pDetails.filter((plan: any) => { return plan.planname.includes('Standard') && plan.pbenefits.includes('Passport') && plan.planname.includes('Student') })

  }
}

