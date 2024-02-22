import { Component } from '@angular/core';
import { FiltersService } from 'src/app/service/filters/filters.service';
import { GetDataService } from 'src/app/service/getData/get-data.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {

  sumInsuredValues = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000]
  loading : boolean = false;
  pData: any;
  pFilterData: any;
  sub: any;
  primeAcePlans: any;
  sumInsured : any = '';
  constructor(
    private getPolicyDetails : GetDataService,
    private filters : FiltersService
  ) {}

  onItemChange(e : any)
  {
    console.log('Value is', e.target.value);
    this.filters.sumInsuredAmount = e.target.value;

    if(this.filters.sumInsuredAmount == 50000)
    {
      this.pFilterData = this.pData.filter((plan : any) => {return plan.pTravelPremiumIn_inout.ptravelplan.includes('Standard') })
      console.log(this.pFilterData)
    }
    else if(this.filters.sumInsuredAmount == 100000)
    {
      this.pFilterData = this.pData.filter((plan : any) => {return plan.pTravelPremiumIn_inout.ptravelplan.includes('Silver') })
      console.log(this.pFilterData)
    }
    if(this.filters.sumInsuredAmount == 200000)
    {
      this.pFilterData = this.pData.filter((plan : any) => {return plan.pTravelPremiumIn_inout.ptravelplan.includes('Gold') })
      console.log(this.pFilterData)
    }
    if(this.filters.sumInsuredAmount == 500000)
    {
      this.pFilterData = this.pData.filter((plan : any) => {return plan.pTravelPremiumIn_inout.ptravelplan.includes('Platinum') })
      console.log(this.pFilterData)
    }
  }
  
  ngOnInit()
  {
    this.pData = this.getPolicyDetails.policyData;
    console.log(this.pData)
  }
}
