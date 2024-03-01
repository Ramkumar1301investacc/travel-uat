import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { UpperfooterComponent } from './component/upperfooter/upperfooter.component';
import { TravelHomeComponent } from './pages/travel-home/travel-home.component';
import { TravelDestinationComponent } from './pages/travel-destination/travel-destination.component';
import { DestinationDateComponent } from './pages/travel-destination/destination-date/destination-date.component';
import { TravellersAgeComponent } from './pages/travel-destination/travellers-age/travellers-age.component';
import { MobileNumComponent } from './pages/travel-destination/mobile-num/mobile-num.component';
import { GetOtpComponent } from './pages/travel-destination/get-otp/get-otp.component';
import { DatePipe } from '@angular/common';
import { NgOtpInputModule } from  'ng-otp-input';
import { FirstQuotesComponent } from './pages/first-quotes/first-quotes.component';
import { QuotesComponent } from './pages/first-quotes/quotes/quotes.component';
import { CompareQuotesComponent } from './pages/first-quotes/compare-quotes/compare-quotes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { FormComponent } from './pages/form/form.component';
import { PersonalDetailComponent } from './pages/form/personal-detail/personal-detail.component';
import { KycVerifyComponent } from './pages/form/kyc-verify/kyc-verify.component';
import { MedicalFormComponent } from './pages/form/medical-form/medical-form.component';
import { FinalFormComponent } from './pages/form/final-form/final-form.component';
import { FormDataService } from './service/form-data.service';
import { ProgressBarComponent } from './component/progress-bar/progress-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        UpperfooterComponent,
        TravelHomeComponent,
        TravelDestinationComponent,
        DestinationDateComponent,
        TravellersAgeComponent,
        MobileNumComponent,
        GetOtpComponent,
        FirstQuotesComponent,
        QuotesComponent,
        CompareQuotesComponent,
       /*  TravellerFormComponent, */
        FormComponent,
        PersonalDetailComponent,
        KycVerifyComponent,
        MedicalFormComponent,
        FinalFormComponent,
        ProgressBarComponent,
    ],
    providers: [FormDataService,DatePipe],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOtpInputModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
