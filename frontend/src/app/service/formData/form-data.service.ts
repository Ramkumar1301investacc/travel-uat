import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  formData:any;

  setFormData(data:any){
    this.formData=data;
  }

  getFormData():any{
    console.log('Retrieving Form Data:', this.formData);
    return this.formData;
  }
}
