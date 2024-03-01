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
    return this.destData
  }
}
