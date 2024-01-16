import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelHomeComponent } from './pages/travel-home/travel-home.component';
import { TravelDestinationComponent } from './pages/travel-destination/travel-destination.component';
import { DestinationDateComponent } from './pages/travel-destination/destination-date/destination-date.component';
import { TravellersAgeComponent } from './pages/travel-destination/travellers-age/travellers-age.component';
import { MobileNumComponent } from './pages/travel-destination/mobile-num/mobile-num.component';
import { GetOtpComponent } from './pages/travel-destination/get-otp/get-otp.component';
import { FirstQuotesComponent } from './pages/first-quotes/first-quotes.component';
import { QuotesComponent } from './pages/first-quotes/quotes/quotes.component';
import { CompareQuotesComponent } from './pages/first-quotes/compare-quotes/compare-quotes.component';

import { FormComponent } from './pages/form/form.component';
import { PersonalDetailComponent } from './pages/form/personal-detail/personal-detail.component';
import { KycVerifyComponent } from './pages/form/kyc-verify/kyc-verify.component';
import { MedicalFormComponent } from './pages/form/medical-form/medical-form.component';
import { FinalFormComponent } from './pages/form/final-form/final-form.component';


const routes: Routes = [
  { path: '', component: TravelHomeComponent },
  {
    path: 'travel-destination', component: TravelDestinationComponent,
    children: [
      { path: "", component: DestinationDateComponent },
      { path: "travellers-age", component: TravellersAgeComponent },
      { path: "travellers-number", component: MobileNumComponent },
      { path: "get-otp", component: GetOtpComponent }
    ]
  },
  {
    path: 'first-quotes', component: FirstQuotesComponent,
    children: [
      { path: "", component: QuotesComponent },
      { path: "compare-quotes", component: CompareQuotesComponent }
    ]
  },
  
  {
    path:'traveller-form',component:FormComponent,
    children:[
      {path:"", component:PersonalDetailComponent},
      {path:"kyc-nominee",component:KycVerifyComponent},
      {path:"medical-details",component:MedicalFormComponent},
      {path:"verify-form",component:FinalFormComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
