import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedBadgeDataService } from 'src/app/service/shared-badge-data.service';
SharedBadgeDataService
// import { GetcountriesService } from 'src/app/service/getcountries.service';
// GetcountriesService

@Component({
  selector: 'app-travel-destination',
  templateUrl: './travel-destination.component.html',
  styleUrls: ['./travel-destination.component.css']
})
export class TravelDestinationComponent implements OnInit {

  badges = [];
  // firstBadge = ''
  sub: Subscription
  constructor(private sharedBadge: SharedBadgeDataService) { }

  ngAfterContentInit() {
    this.sub = this.sharedBadge.send_data.subscribe((data) => {
      this.badges = data;
      // console.log(this.badges);
      // console.log('First', this.badges[0]);

    })

    // this.sub = this.sharedBadge.sendFirstBadge.subscribe((data) => {
    //   this.firstBadge=data
    // })
  }

  ngOnInit(): void {

  }



}
