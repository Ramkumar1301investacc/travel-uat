import { Component } from '@angular/core';
import { GetDataService } from 'src/app/service/getData/get-data.service';
import { GetPlansService } from 'src/app/service/getPlans/get-plans.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  pData: any;
  sub: any;
  primeAcePlans: any;
  constructor(
    private getPolicyDetails : GetDataService,
    private getPrimeAcePlans : GetPlansService
  ) {}

  
  ngOnInit()
  {
    
    this.pData = this.getPolicyDetails.policyData
    console.log('Policy Data', this.pData)

    // this.sub = this.getPrimeAcePlans.getPlans().subscribe((data) => {
    //   this.primeAcePlans = data;
    // });
   
  }
}
