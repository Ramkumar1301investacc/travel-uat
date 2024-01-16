import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/service/form-data.service';
@Component({
  selector: 'app-kyc-verify',
  templateUrl: './kyc-verify.component.html',
  styleUrls: ['./kyc-verify.component.css'],
})
export class KycVerifyComponent {

   constructor(private fb: FormBuilder, private router:Router, private formDataService: FormDataService ){

   }
   kycDetail=this.fb.group({
    verificationOption: ['',{}],
    CardNumber: ['',{}],
    nomineeFirstName: ['',{}],
    nomineeRelationship: ['',{}],
    nomineeAge: ['',{}],
    nomineeMail_id: ['',{}],
    nomineePhone_no: ['',{}],

   })






  /* kycDetail = new FormGroup({
    verificationOption: new FormControl(''),
    CardNumber: new FormControl(''),
    nomineeFirstName: new FormControl(''),
    nomineeRelationship: new FormControl(''),
    nomineeAge: new FormControl(''),
    nomineeMail_id: new FormControl(''),
    nomineePhone_no: new FormControl(''),
  }); */
  onSubmit() {
    console.log(this.kycDetail.value)

    this.formDataService.setFormData({ ...this.formDataService.getFormData(), ...this.kycDetail.value });
    this.router.navigate(['/traveller-form/medical-details'])
   
    // Navigate to the next step or perform other actions
  }
}
