import { Injectable } from '@angular/core';
import { TravelerForm } from '../Models/traveler-form';

@Injectable({
  providedIn: 'root'
})
export class DestAgeNumService {


  constructor() { 
  }
   destData: any;

  setDestData(data: any)
  {
    this.destData = data;
  }

  getDestData(): any {
    console.log('Console from service. Retrieving Destination and Traveller data coming from destination date and travellers age.', this.destData);
    return this.destData
  }
}
