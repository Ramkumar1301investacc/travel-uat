import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { SendDataService } from 'src/app/service/sendData/send-data.service';


@Component({
  selector: 'app-travellers-age',
  templateUrl: './travellers-age.component.html',
  styleUrls: ['./travellers-age.component.css']
})
export class TravellersAgeComponent {

  constructor(
    private formBuilder: FormBuilder,
    private destDataService: DestAgeNumService,
    private sendTravellerData : SendDataService
  ) { }
  finalFormData: any;
  ageForm: FormGroup = new FormGroup({})
  currentValue: number = 1;
  toggleClass(e: any, className: string) {
    const hasClass = e.target.classList.contains(className);
    this.currentValue = e.target.value;
    this.ageForm = this.formBuilder.group({
      numOfTraveller: this.currentValue,
      ageofTravellerOne: '',
      ageofTravellerTwo: ''
    })

    if (hasClass) {
      e.target.classList.remove("active")
    }
    else {
      e.target.classList.add("active");

      let allSibling = e.target.parentElement.children;

      let allSiblingArray = Array.from(allSibling);

      allSiblingArray.map((sibling: any) => {
        if (sibling.value != this.currentValue) {
          sibling.classList.remove("active")
        }
      })
    }
  }



  ngOnInit() {
    this.ageForm = this.formBuilder.group({
      numOfTraveller: this.currentValue,
      ageofTravellerOne: '',
      ageofTravellerTwo: ''
    })
  }

  onSubmit() {
    if (this.ageForm.valid) {
      console.log('Valid');

      this.destDataService.setDestData({ ...this.destDataService.getDestData(), ...this.ageForm.value });

      this.finalFormData = this.destDataService.getDestData();
      console.log(this.finalFormData)

      this.sendTravellerData.sendData(this.finalFormData).subscribe(
        response => {
          console.log('Data Sent')
        },
        error => {
          console.log('error')
        }
      );
    }
  }

  statusValue = false;

  @Output() onButtonClick = new EventEmitter<object>();


  updateProgressBar() {
    console.log("clicked Buttton")
    const moveProgress = document.querySelector('.cable-car') as HTMLElement | null;
    if (moveProgress) {

      moveProgress.style.marginLeft = '430px';

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






}
