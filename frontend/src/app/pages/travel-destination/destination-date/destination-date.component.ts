import { Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { GetcountriesService } from 'src/app/service/getcountries.service';
import { SharedBadgeDataService } from 'src/app/service/shared-badge-data.service';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Output } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-destination-date',
  templateUrl: './destination-date.component.html',
  styleUrls: ['./destination-date.component.css']
})


export class DestinationDateComponent {
 
  constructor(private getCountries: GetcountriesService, private sharedBadgeService: SharedBadgeDataService ,
    private renderer: Renderer2
    ) { }

  countries: any = [];                                                     //array to store countries

  searchText: string = '';                                                 //string to store input value

  badgeItems: any = [];                                                    //array to store selected countries badge

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    // console.log(this.searchText)
  }

  ngOnInit() {                                                              //function to fetch countries data and store it in array
    this.getCountries.getCountriesApi().subscribe((data: any) => {
      let allCountriesName = data['data'];
      allCountriesName.map((country: any) => {
        // console.log(country.country, country.code)
        this.countries.push(country.country)
      })
    })
  }

  divClass = '';
  classDiv = ''

  divClose() {                                                               //function to close countries list div
    this.classDiv = 'd-none'
  }

  divOpen() {                                                                //function to open countries list div
    this.classDiv = 'd-block'
  }

  getValue(e: any) {                                                         //function to add countries badges
    let value = e.target.innerHTML;
    this.badgeItems.push(value)
  }

  delete(i: any) {                                                           //function to delete badges
    this.badgeItems.splice(i, 1)
  }

  firstBade = ''
  sendBadgeData() {
    this.sharedBadgeService.send_data.next(this.badgeItems);
  }
 /*  @Input() progressBar: ElementRef | undefined; */
@Output() onButtonClick = new EventEmitter<object>();


   updateProgressBar(){
    console.log("clicked Buttton")
    const moveProgress=document.querySelector('.cable-car') as HTMLElement | null;
    if (moveProgress) {
      
      moveProgress.style.marginLeft = '350px';
      
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
  