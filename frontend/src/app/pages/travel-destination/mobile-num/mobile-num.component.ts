import { Component, EventEmitter, Output } from '@angular/core';
import { GetDataService } from 'src/app/service/getData/get-data.service';

@Component({
  selector: 'app-mobile-num',
  templateUrl: './mobile-num.component.html',
  styleUrls: ['./mobile-num.component.css']
})
export class MobileNumComponent {

  policyData : any;
  constructor( private getData: GetDataService ) {}

  @Output() onButtonClick = new EventEmitter<object>();


  updateProgressBar(){
   console.log("clicked Buttton")
   const moveProgress=document.querySelector('.cable-car') as HTMLElement | null;
   if (moveProgress) {
     
     moveProgress.style.marginLeft = '650px';
     
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

  ngOnInit()
  {
    this.policyData = this.getData.policyData;
    console.log('On Mobile Number', this.policyData)
  }

}
