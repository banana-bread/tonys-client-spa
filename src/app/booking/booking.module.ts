import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module'
import { BookingComponent } from '../booking/booking.component';
import { ServiceSelectionComponent } from '../booking/service-selection/service-selection.component';
import { StaffSelectionComponent } from './staff-selection/staff-selection.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';
import { PublicModule } from '../public.module';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { BookingSummaryComponent } from './booking-confirmation/booking-summary/booking-summary.component';

@NgModule({
    declarations: [
        BookingComponent,
        ServiceSelectionComponent,
        StaffSelectionComponent,
        SlotSelectionComponent,
        BookingConfirmationComponent,
        BookingSummaryComponent,
    ],
    imports: [
        SharedModule,
        PublicModule,
    ],
    exports: []
  })
  export class BookingModule { }