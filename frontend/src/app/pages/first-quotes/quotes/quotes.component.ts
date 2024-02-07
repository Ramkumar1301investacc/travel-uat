import { Component } from '@angular/core';
import { GetDataService } from 'src/app/service/getData/get-data.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  pData: any;
  constructor(
    private getPolicyDetails : GetDataService
  ) {}

  ngOnInit()
  {
    this.pData = this.getPolicyDetails.policyData
    console.log('Policy Data', this.pData)
  }
}
