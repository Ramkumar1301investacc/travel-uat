import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  constructor(private router:Router,
    private fb: FormBuilder){

  }



stepnumber= 1;
next(){
  if (this.stepnumber<3) {
    this.stepnumber++
    
  }
}
previous(){
  if (this.stepnumber>1) {
    this.stepnumber--
    
  }
}

ngOnInit() {
  this.step1 = this.fb.group({
    // Define controls for step 1
    salutation : [''],
    firstName:[''],
    middleName:['',{ }],
    surName:['',{ }],
    dob:['',{ }],
    passportNo:['',{ }],
    emailId:['',{ }],
    phoneNumber:['',{ }],
    alternatePhoneNumber:['',{ }],
    addressLine_1:['',{ }],
    addressLine_2:['',{ }],
    addressLine_3:['',{ }],
    state:['',{ }],
    city:['',{ }],
    pincode:['',{ }],
    /* ispermanentAdress:new FormControl(''), */
  });






}
onFormSubmit(){
  // this.router.navigate('')
   const proposalFormData = this.step1.value;
   console.log(proposalFormData)

}}
