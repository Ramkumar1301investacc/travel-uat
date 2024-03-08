import { FormDataService } from './../../service/form-data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm , FormGroup} from '@angular/forms';
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

  constructor(private router:Router,private formDataService:FormDataService){
  }

  next(assignedForm:NgForm){
    this.formDataService.setFormData(this.proposalRequest);
    console.log("Data is coming from service:",this.formDataService.formData);

    if (this.stepNumber<3) {
      this.stepNumber++
    }
  }
  previous(){

    if (this.stepNumber>1) {
      this.stepNumber--
      
    }
  }

  ngOnInit() {
  }
}
