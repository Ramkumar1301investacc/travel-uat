import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DbServiceService } from 'src/app/service/dbService/db-service.service';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';

@Component({
  selector: 'app-mobile-num',
  templateUrl: './mobile-num.component.html',
  styleUrls: ['./mobile-num.component.css']
})
export class MobileNumComponent {

  getDataOfTraveller: any
  constructor(
    private getTravellerData: DestAgeNumService,
    private formBuilder: FormBuilder,
    private dbService: DbServiceService
  ) { }

  mobileForm: FormGroup = new FormGroup({})

  @Output() onButtonClick = new EventEmitter<object>();


  updateProgressBar() {
    console.log("clicked Buttton")
    const moveProgress = document.querySelector('.cable-car') as HTMLElement | null;
    if (moveProgress) {

      moveProgress.style.marginLeft = '650px';

      // transition properties
      moveProgress.style.transition = 'margin-left 5s ease';

      moveProgress.style.animationDuration = '3s';

      moveProgress.style.animationIterationCount = 'infinite';
      moveProgress.style.animationDirection = 'alternate';
    } else {
      console.log('Style Not Applied ')
    }
    // Emit an event to notify the parent component
    this.onButtonClick.emit();
  }

  onSubmit() {
    this.getTravellerData.setDestData({ ...this.getTravellerData.getDestData(), ...this.mobileForm.value });
    console.log('Dest Data', this.getTravellerData.destData);
    this.dbService.sendTravellerDetails().subscribe(response => {
      console.log(response)
    })
  }

  ngOnInit() {
    this.mobileForm = this.formBuilder.group({
      mobileNumber: ['']
    })
  }

}
