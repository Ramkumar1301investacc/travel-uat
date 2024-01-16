import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';

@Component({
  selector: 'app-personal-detail',
  templateUrl: './personal-detail.component.html',
  styleUrls: ['./personal-detail.component.css']
})
export class PersonalDetailComponent {
  constructor(private router:Router,private fb : FormBuilder, private formDataService: FormDataService ){

  }
  personalDetail =this.fb.group({
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
  })

  /* personalDetail = new FormGroup({
    salutation : new FormControl('null'),
    firstName:new FormControl(''),
    middleName:new FormControl(''),
    surName:new FormControl(''),
    dob:new FormControl(''),
    passportNo:new FormControl(''),
    emailId:new FormControl(''),
    phoneNumber:new FormControl(''),
    alternatePhoneNumber:new FormControl(''),
    addressLine_1:new FormControl(''),
    addressLine_2:new FormControl(''),
    addressLine_3:new FormControl(''),
    state:new FormControl(''),
    city:new FormControl(''),
    pincode:new FormControl(''),
    /* ispermanentAdress:new FormControl(''), */

  onSubmit() {
    console.log(this.personalDetail.value);
 
    this.formDataService.setFormData({ ...this.formDataService.getFormData(), ...this.personalDetail.value });
    console.log("personal Detail",this.personalDetail.value);
   
    this.router.navigate(['/traveller-form/kyc-nominee']);
    }
  

}

