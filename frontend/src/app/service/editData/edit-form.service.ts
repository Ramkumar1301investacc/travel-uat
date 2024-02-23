import { Injectable } from '@angular/core';
import { TravelerForm } from '../../Models/traveler-form';

@Injectable({
  providedIn: 'root'
})
export class EditFormService {
  private editTravelDetails:TravelerForm[]=[];

  constructor() {
    let savedTravelDetails=localStorage.getItem("editTravelDetails");
    this.editTravelDetails=savedTravelDetails? JSON.parse(savedTravelDetails): [];
   }

   getFromDetails(id:string):TravelerForm[]{
    return this.editTravelDetails;
  }

  getFormDetails(id:string):TravelerForm | undefined{
    return this.editTravelDetails.find(res => res.id === id);
  }
  
  addFormDetails(editForm:TravelerForm):void{
    this.editTravelDetails.push(editForm);
    console.log(this.editTravelDetails);
    localStorage.setItem("editTravelDetails",JSON.stringify(this.editTravelDetails));
  }

  deleteReservation(id:string):void{
    let index=this.editTravelDetails.findIndex(res => res.id==id);
    this.editTravelDetails.splice(index,1);
    localStorage.setItem("reservations",JSON.stringify(this.editTravelDetails));
  }

  updateReservation(updatedForm:TravelerForm):void{
    let index=this.editTravelDetails.findIndex(res => res.id === updatedForm.id);
    this.editTravelDetails[index]=updatedForm;
    localStorage.setItem("reservations",JSON.stringify(this.editTravelDetails));
  }
}
