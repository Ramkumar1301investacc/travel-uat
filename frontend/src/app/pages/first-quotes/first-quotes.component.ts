import { Component, OnInit, Pipe , PipeTransform} from '@angular/core';
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';
import { TravelDetails } from '../../Interfaces/travel-details';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-first-quotes',
  templateUrl: './first-quotes.component.html',
  styleUrls: ['./first-quotes.component.css'],
  providers:[DatePipe],
})


export class FirstQuotesComponent {
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
  birthdate: string; 


  constructor(private getDestData:DestAgeNumService,private datePipe:DatePipe){
    // this.birthdate = this.destData.ageofTravellerOne;
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

  //onclick funtion for edit button
  onClick(){
    alert("edit button is clicked");
  }

  ngOnInit(){
    this.destData=this.getDestData.getDestData();
    this.formatTripDates();
    console.log(this.calculateAge());

  }

}
