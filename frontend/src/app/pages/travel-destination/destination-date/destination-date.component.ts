import { Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { GetcountriesService } from 'src/app/service/getcountries.service';
import { SharedBadgeDataService } from 'src/app/service/shared-badge-data.service';
import { Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DestAgeNumService } from 'src/app/service/dest-age-num.service';

@Component({
  selector: 'app-destination-date',
  templateUrl: './destination-date.component.html',
  styleUrls: ['./destination-date.component.css']
})


export class DestinationDateComponent {

  constructor(
    private getCountries: GetcountriesService,
    private sharedBadgeService: SharedBadgeDataService,
    private formBuilder: FormBuilder,
    private destDataService: DestAgeNumService
  ) { }

  topCountriesBadge = ['United States', 'Canada', 'England', 'Spain', 'Japan', 'France', 'UAE', 'Thailand', 'Germany', 'Singapore']

  countries: any = [];                                                     //array to store countries

  searchText: string = '';                                                 //string to store input value

  badgeItems: any = [];                                                    //array to store selected countries badge

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  travelForm: FormGroup = new FormGroup({})

  ngOnInit() {                                                              //function to fetch countries data and store it in array
    this.getCountries.getCountriesApi().subscribe((data: any) => {
      let allCountriesName = data['data'];
      allCountriesName.map((country: any) => {
        this.countries.push(country.country)
      })
    })

    this.travelForm = this.formBuilder.group({
      tDest: [this.badgeItems],
      tripStart: ['', Validators.required],
      tripEnd: ['', Validators.required],
      destBadge: [this.badgeItems]
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
    this.badgeItems.push(value);
    console.log('Badge Items', this.badgeItems);
    // this.travelForm = this.formBuilder.group({
    //   tDest: [this.badgeItems],
    //   tripStart: ['', Validators.required],
    //   tripEnd: ['', Validators.required]
    // })
    // this.travelForm.get('tDest')?.setValue(this.badgeItems);
    // console.log('tDest value', this.travelForm.get('tDest')?.value);
    this.searchText = ''
  }

  delete(i: any) {                                                           //function to delete badges
    this.badgeItems.splice(i, 1)
  }

  firstBade = ''
  sendBadgeData() {
    this.sharedBadgeService.send_data.next(this.badgeItems);
  }

  onSubmit() {
    if (this.travelForm.valid) {
      this.destDataService.setDestData(this.travelForm.value);
      console.log('Dest Data', this.destDataService.destData);
      // console.log('After submit tDest value', this.travelForm.get('tDest')?.value);
    }
  }

  /*  @Input() progressBar: ElementRef | undefined; */
  @Output() onButtonClick = new EventEmitter<object>();


  updateProgressBar() {
    console.log("clicked Buttton")
    const moveProgress = document.querySelector('.cable-car') as HTMLElement | null;
    if (moveProgress) {

      moveProgress.style.marginLeft = '350px';

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
