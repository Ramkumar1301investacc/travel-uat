import { FormDataService } from './../../service/form-data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm , FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { ProposalOwnerDetails, ProposalRequest } from 'src/app/Models/FormClasses';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { PlanDetailsService } from 'src/app/service/planDetails/plan-details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // step1: FormGroup;
  /*step2: FormGroup;
  step3: FormGroup;*/

  proposalRequest:ProposalRequest=new ProposalRequest();
    
  stepNumber= 1;

  tripDestination = this.getTravelData.destData.tDest;
  tripStart = this.getTravelData.destData.tripStart;
  tripEnd = this.getTravelData.destData.tripEnd;
  singlePlanDetail: any;
  medicalCoverage: any;
  passportCoverage: any;
  baggageCoverage: any;
  premiumDetail: any;
  insuranceCost: any;
  gstCost: any;
  totalCost: any;
formData: any;
finalform: NgForm;


constructor(
  private router: Router,
  private fb: FormBuilder,
  private getTravelData: DestAgeNumService,
  private getSinglePlanDetail: PlanDetailsService,
  private formdataservice:FormDataService
) { }

  next(assignedForm:NgForm){
    this.formdataservice.setFormData(this.proposalRequest);
    console.log("Data is coming from service:",this.formdataservice.formData);
  

    if (this.stepNumber<4) {
      this.stepNumber++
    }
  }
  previous(){

    if (this.stepNumber>1) {
      this.stepNumber--
      
    }
  }

  ngOnInit() {
    this.getSinglePlanDetail.getSinglePlanDetails(this.getSinglePlanDetail.singlePlanName).subscribe((response) => {
      this.singlePlanDetail = response;
      console.log('In froms component', this.singlePlanDetail);
      this.medicalCoverage = this.singlePlanDetail.filter((plan: any) => { return plan.pbenefits.includes('Medical') });
      this.passportCoverage = this.singlePlanDetail.filter((plan: any) => { return plan.pbenefits.includes('Passport') });
      this.baggageCoverage = this.singlePlanDetail.filter((plan: any) => { return plan.pbenefits.includes('Baggage') });
  
      console.log('Medical Coverage', this.medicalCoverage[0].plimits)
    })

    this.getSinglePlanDetail.getSingleCalculatePremium( 
      this.getTravelData.getDestData(), 
      this.getSinglePlanDetail.singlePlanName ). subscribe((response) => {
        this.premiumDetail = response;
      })

      this.formData = this.formdataservice.getFormData();
  }

}
