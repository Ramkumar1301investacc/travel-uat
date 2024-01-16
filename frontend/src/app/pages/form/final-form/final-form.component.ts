import { Component } from '@angular/core';
import { FormDataService } from 'src/app/service/form-data.service';
@Component({
  selector: 'app-final-form',
  templateUrl: './final-form.component.html',
  styleUrls: ['./final-form.component.css']
})
export class FinalFormComponent {
firstName: any;
formData: any;
kycDetail: any;
personalDetail: any;


  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.formData = this.formDataService.getFormData();
    console.log(this.formData);
    console.log('Personal Details in KYC Component:', this.formData);
}

}