import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module'
import { BookingComponent } from './booking.component';
import { ServiceSelectionComponent } from './service-selection/service-selection.component';
import { StaffSelectionComponent } from './staff-selection/staff-selection.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';
import { PublicModule } from '../../public.module';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { TonysSharedModule } from '@tonys-barbers/shared';
import { ReCaptchaModule } from 'angular-recaptcha3';
import { ClientBookingsComponent } from '../client-bookings/client-bookings.component';
import { LoginPageComponent } from '../login-page/login-page.component';

const RECAPTCHA_OPTIONS = {
  invisible: {
      sitekey: '6Ld6l_YdAAAAALh3qwPqNjDodlBDf9smj0Tgjqx_', 
  },
  normal: {
      sitekey: '6Ld6l_YdAAAAALh3qwPqNjDodlBDf9smj0Tgjqx_', 
  },
  language: 'en'
};

@NgModule({
    declarations: [
        BookingComponent,
        ServiceSelectionComponent,
        StaffSelectionComponent,
        SlotSelectionComponent,
        BookingConfirmationComponent,
        ClientBookingsComponent,
        LoginPageComponent,
    ],
    imports: [
        SharedModule,
        PublicModule,
        TonysSharedModule.forRoot('http://localhost:89'),
        ReCaptchaModule.forRoot(RECAPTCHA_OPTIONS),
    ],
    exports: []
  })
  export class BookingModule { }