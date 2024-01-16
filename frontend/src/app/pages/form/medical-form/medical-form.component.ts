import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.css']
})
export class MedicalFormComponent {
  constructor(private router:Router){

  }
  onSubmit() {
 
    this.router.navigate(['/traveller-form/verify-form']);
    }
  

}
