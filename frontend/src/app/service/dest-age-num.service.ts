import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestAgeNumService {

  constructor() { }
  private destData: any;

  setDestData(data: any)
  {
    this.destData = data;
  }

  getDestData(): any {
    console.log('Retrieving Destination and Traveller data', this.destData);
    return this.destData
  }
}
