import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { PlanDetailsService } from 'src/app/service/planDetails/plan-details.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private getTravelData: DestAgeNumService,
    private getSinglePlanDetail: PlanDetailsService
  ) { }

  tripDestination = this.getTravelData.destData.tDest;
  tripStart = this.getTravelData.destData.tripStart;
  tripEnd = this.getTravelData.destData.tripEnd;
  singlePlanDetail: any;
  medicalCoverage: any;
  passportCoverage: any;
  baggageCoverage: any;

  stepnumber = 1;
  next() {
    if (this.stepnumber < 3) {
      this.stepnumber++

    }
  }
  previous() {
    if (this.stepnumber > 1) {
      this.stepnumber--

    }
  }

  ngOnInit() {
    this.step1 = this.fb.group({
      // Define controls for step 1
      salutation: [''],
      firstName: [''],
      middleName: ['', {}],
      surName: ['', {}],
      dob: ['', {}],
      passportNo: ['', {}],
      emailId: ['', {}],
      phoneNumber: ['', {}],
      alternatePhoneNumber: ['', {}],
      addressLine_1: ['', {}],
      addressLine_2: ['', {}],
      addressLine_3: ['', {}],
      state: ['', {}],
      city: ['', {}],
      pincode: ['', {}],
      /* ispermanentAdress:new FormControl(''), */
    });

    this.getSinglePlanDetail.getSinglePlanDetails(this.getSinglePlanDetail.singlePlanName).subscribe((response) => {
      this.singlePlanDetail = response;
      console.log('In froms component', this.singlePlanDetail);
      this.medicalCoverage = this.singlePlanDetail.filter((plan: any) => { return plan.pbenefits.includes('Medical') });
      this.passportCoverage = this.singlePlanDetail.filter((plan: any) => { return plan.pbenefits.includes('Passport') });
      this.baggageCoverage = this.singlePlanDetail.filter((plan: any) => { return plan.pbenefits.includes('Baggage') });
  
      console.log('Medical Coverage', this.medicalCoverage[0].plimits)
    })
    // console.log('Form component mdhe simgle details',this.singlePlanDetail)

   
  }

  onFormSubmit() {
    // this.router.navigate('')
    const proposalFormData = this.step1.value;
    console.log(proposalFormData)

  }
}
