import { EditFormService } from '../../service/editData/edit-form.service';
import { TravelerForm } from 'src/app/Models/traveler-form';
import { SendDataService } from './../../service/sendData/send-data.service';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { TravelDetails } from 'src/app/Models/travel-details';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-quotes',
  templateUrl: './first-quotes.component.html',
  styleUrls: ['./first-quotes.component.css'],
  providers: [DatePipe],
})


export class FirstQuotesComponent {
  destData: TravelDetails = {
    ageofTravellerOne: "",
    ageofTravellerTwo: "",
    numOfTraveller: '',
    tDest: ["India"],
    tripStart: "",
    tripEnd: ""
  };


  formattedTripStart: string | null;
  formattedTripEnd: string | null;
  updateTripStart: string | null;


  //2.0
  startDate: any;
  endDate: any;
  //

  constructor(
    private getDestData: DestAgeNumService,
    private datePipe: DatePipe,
    private setdestdata: DestAgeNumService,
    private formBuilder: FormBuilder,
    private editDestData: EditFormService) {
    // this.birthdate = this.destData.ageofTravellerOne;
    // this.data=this.setDestData;
  }

  /*For calculating age*/
  calculateAge(): number {
    const today = new Date();
    const birthDate = new Date(this.destData.ageofTravellerOne);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.floor(age);
  }

  /*for calculating trip startdate and enddate  */
  formatTripDates(): void {
    // Format tripStart date
    this.formattedTripStart = this.formatDate(this.getDestData.destData.tripStart);
    // Format tripEnd date
    this.formattedTripEnd = this.formatDate(this.getDestData.destData.tripEnd);
  }

  formatDate(dateString: string): string | null {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null; // Invalid date format
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }


  updateForm: FormGroup;

  onSubmit() {
    this.setdestdata.setDestData(this.updateForm.value);
    console.log('NishRao is here', this.setdestdata.destData);
  }

 
  ngOnInit() {

    this.destData = this.getDestData.getDestData();
    this.formatTripDates();

    this.updateForm = this.formBuilder.group({
      tripStartDate: [this.getDestData.destData.tripStart, Validators.required],
      tripEndDate: [this.getDestData.destData.tripEnd, Validators.required],
      travelDestination: [this.getDestData.destData.tDest, Validators.required],
      travelerAge: [this.getDestData.destData.ageofTravellerOne, Validators.required]
    })

    console.log('rao is here', this.getDestData.destData.tDest.map((s: any) => s))
  }

}



// if(this.updateForm.valid){
//   let travelerform:TravelerForm=this.updateForm.value;
//   this.editDestData.addFormDetails(travelerform);
// } 