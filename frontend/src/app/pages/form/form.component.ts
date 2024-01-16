import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
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

}