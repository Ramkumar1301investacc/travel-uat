import { FormDataService } from './../../service/form-data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProposalOwnerDetails, ProposalRequest } from 'src/app/Models/FormClasses';
import { DbServiceService } from 'src/app/service/dbService/db-service.service';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { PlanDetailsService } from 'src/app/service/planDetails/plan-details.service';
import { SendProposalDataService } from 'src/app/service/sendProposalData/send-proposal-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // step1: FormGroup;
  /*step2: FormGroup;
  step3: FormGroup;*/

  proposalRequest: ProposalRequest = new ProposalRequest();

  stepNumber = 1;

  tripDestination = this.getTravelData.destData.destBadge;
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
  proposalData: any;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private getTravelData: DestAgeNumService,
    private getSinglePlanDetail: PlanDetailsService,
    private formdataservice: FormDataService,
    private dbService: DbServiceService,
    private proposalDataService: SendProposalDataService

  ) { }

  /*next(assignedForm:NgForm){
    this.formdataservice.setFormData(this.proposalRequest.proposalOwnerDetails);
    console.log("Data is coming from service:",this.formdataservice.formData);
  

    if (this.stepNumber<4) {
      this.stepNumber++
    }

    this.dbService.sendProposalFormDetails().subscribe(response => {
      console.log("Proposal Data is added in database:"+response)
    })
  }*/

  next(assignedForm: NgForm) {
    if (this.stepNumber === 1) {
      this.formdataservice.setFormData(this.proposalRequest.proposalOwnerDetails);
      console.log("Customer Details are set in service:", this.formdataservice.formData);
      this.dbService.sendProposalCustomerFormDetails().subscribe(response => {
        console.log("Customer Data is added in database:" + response)
      })
    } else if (this.stepNumber == 2) {
      this.formdataservice.setFormData(this.proposalRequest.proposalNomineeDetails);
      console.log("Nominee Details are set in service:", this.formdataservice.formData);
      this.dbService.sendProposalNomineeFormDetails().subscribe(response => {
        console.log("Nominee Data is added in database" + response);
        console.log("Proposal Form Data", this.proposalRequest);
        console.log("Starting User Details", this.getTravelData.destData)
        this.proposalData = {
          ...this.proposalRequest,
          ...this.getTravelData.destData
        }
        console.log('Al  final proposal data', this.proposalData);
      })
    }

    if (this.stepNumber < 4) {
      this.stepNumber++
    }

  }

  previous() {

    if (this.stepNumber > 1) {
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
      this.getSinglePlanDetail.singlePlanName).subscribe((response) => {
        this.premiumDetail = response;
      })

    this.formData = this.formdataservice.getFormData();
  }

  sendProposalData() {
    this.proposalDataService.sendProposalData(this.proposalData).subscribe((response: any) => console.log('Response from request ID', response))
  }

}
