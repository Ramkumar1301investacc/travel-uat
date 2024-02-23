import { EditFormService } from '../../service/editData/edit-form.service';
import { TravelerForm } from 'src/app/Models/traveler-form';
import { SendDataService } from './../../service/sendData/send-data.service';
import { Component, OnInit, Pipe , PipeTransform} from '@angular/core';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { TravelDetails } from 'src/app/Models/travel-details';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-first-quotes',
  templateUrl:'./first-quotes.component.html',
  styleUrls: ['./first-quotes.component.css'],
  providers:[DatePipe],
})


export class FirstQuotesComponent{
  destData: TravelDetails = {
    ageofTravellerOne: "",
    ageofTravellerTwo: "",
    numOfTraveller: '',
    tDest: [""],
    tripStart: "",
    tripEnd: ""
  };  


  formattedTripStart: string | null;
  formattedTripEnd: string | null;
  updateTripStart:string | null;


  constructor(private getDestData:DestAgeNumService,private datePipe:DatePipe,private setdestdata:DestAgeNumService,private formBuilder:FormBuilder,private editDestData:EditFormService){
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
    this.formattedTripStart = this.formatDate(this.destData.tripStart);
    // Format tripEnd date
    this.formattedTripEnd = this.formatDate(this.destData.tripEnd);
  }

  formatDate(dateString: string): string | null {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {  
      return null; // Invalid date format
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  //editDetails : for updating data
  /*formData(){
    this.destData=this.getDestData.getDestData();
    this.updateTripStart=this.destData.tripStart;
    console.log("Updated date after adding through form:"+this.updateTripStart);
  }*/

  updateForm:FormGroup=new FormGroup({});
  /*travelDetail : FormGroup = new FormGroup({}) //edited code !important*/

  onSubmit(){
    if(this.updateForm.valid){
      let travelerform:TravelerForm=this.updateForm.value;
      this.editDestData.addFormDetails(travelerform);
    } 
  }
  

  ngOnInit(){

    this.destData=this.getDestData.getDestData();
    this.formatTripDates();

    //validators for traveldetail
    /*this.travelDetail =this.formBuilder.group({
      ageofTraveller:['',Validators.required],
      numOfTraveller:['',Validators.required],
      tDest:['',Validators.required],
      tripStart:['',Validators.required],
      tripEnd:['',Validators.required], 
    })*/
    
    //validators for editform
    this.updateForm=this.formBuilder.group({
      tripStartDate:['',Validators.required],
      tripEndDate:['',Validators.required],
      travelDestination:['',Validators.required],
      travelerAge:['',Validators.required]
    })
    // console.log("Updated data is called : "+this.onSubmit());
  }

}
