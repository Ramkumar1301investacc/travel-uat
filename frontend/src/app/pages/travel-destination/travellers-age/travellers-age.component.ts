import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { FiltersService } from 'src/app/service/filters/filters.service';
import { GetDataService } from 'src/app/service/getData/get-data.service';
import { GetPlansService } from 'src/app/service/getPlans/get-plans.service';
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
    private sendTravellerData: SendDataService,
    private getPolicyDetails: GetDataService,
    private getPlans: GetPlansService,
    private filters: FiltersService
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
     
      const date = new Date();
      const ageDate = new Date(this.finalFormData.ageofTravellerOne);
      const travellerAgeYear = ageDate.getFullYear();
      const currentYear = date.getFullYear();

      const travellerAge =  Math.abs(travellerAgeYear - currentYear);


      let filterredPlans = []
      if(travellerAge > 60 && travellerAge < 71)
      {
        filterredPlans = this.getPlans.plans.filter((singlePlan: { pplan: string }) => {return singlePlan.pplan.includes('Age')})
      }
      else
      {
        filterredPlans = this.getPlans.plans;
      }
      // else if(travellerAge < 70)
      // {
      //   filterredPlans = this.getPlans.plans.filter((singlePlan: { pplan: string }) => {return singlePlan.pplan.includes('Age')})
      //   console.log('Age Plans', filterredPlans)
      // }

      this.sendTravellerData.sendData(this.finalFormData, filterredPlans).subscribe(
        response => {
          //Getting data that is coming from backend
          this.getPolicyDetails.policyData = response;
          console.log('Console from travellers-age. Data coming from backend', this.getPolicyDetails.policyData)
        },
        error => {
          console.log('error', error)
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
