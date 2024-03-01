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
  sub: any;
  primeAcePlans: any;
  sumInsured: any = '';
  finalFormData: any;
  filteredPlans: any;
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
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Standard') })
      console.log(this.pFilteredPlanDetails)
    }
    else if (this.filters.sumInsuredAmount == 100000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Silver') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Silver') })
      console.log(this.pFilteredPlanDetails)
    }
    else if (this.filters.sumInsuredAmount == 200000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Gold') && !plan.pTravelPremiumIn_inout.ptravelplan.includes('Super') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Super') })
      console.log(this.pFilteredPlanDetails)
    }
    else if (this.filters.sumInsuredAmount == 300000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Platinum') && !plan.pTravelPremiumIn_inout.ptravelplan.includes('Super') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Platinum') && !plan.pTrvPlanDtlsList_out[0].planname.includes('Super') })
      console.log(this.pFilteredPlanDetails)
    }
    else if (this.filters.sumInsuredAmount == 500000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Super Gold') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Super Gold') })
      console.log(this.pFilteredPlanDetails)
    }
    else if (this.filters.sumInsuredAmount == 750000) {
      this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Super Platinum') })
      this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Super Platinum') })
      console.log(this.pFilteredPlanDetails)
    }
  }

  ngOnInit() {

    this.sendTravelData.sendData(this.destDataService.getDestData(), this.getPlans.plans)
      .subscribe(response => { this.pData = response; console.log(this.pData); this.loading = false; this.loadFirstData() },
        error => { console.log(error) })

    // this.pData = this.getPolicyDetails.policyData;
    this.getPlanDetails.getPlanDetails().subscribe(response => { this.pDetails = response; console.log('Get plan details', response) }, error => { console.log(error) })
  }

  loadFirstData() {
    this.pFilterData = this.pData.filter((plan: any) => { return plan.pTravelPremiumIn_inout.ptravelplan.includes('Standard') })
    this.pFilteredPlanDetails = this.pDetails.filter((plan: any) => { return plan.pTrvPlanDtlsList_out[0].planname.includes('Standard') })
  }
}

