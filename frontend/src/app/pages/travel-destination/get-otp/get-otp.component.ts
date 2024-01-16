import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-get-otp',
  templateUrl: './get-otp.component.html',
  styleUrls: ['./get-otp.component.css']
})
export class GetOtpComponent {
  otpbox=[1,1,1,1];

  @Output() onButtonClick = new EventEmitter<object>();


  updateProgressBar(){
   console.log("clicked Buttton")
   const moveProgress=document.querySelector('.cable-car') as HTMLElement | null;
   if (moveProgress) {
     
     moveProgress.style.marginLeft = '670px';
     
     // transition properties
     moveProgress.style.transition = 'margin-left 5s ease';

     moveProgress.style.animationDuration = '3s';

     moveProgress.style.animationIterationCount = 'infinite';
     moveProgress.style.animationDirection = 'alternate';
   }else{
     console.log('Style Not Applied ')
   }
     // Emit an event to notify the parent component
     this.onButtonClick.emit();
  }

}
