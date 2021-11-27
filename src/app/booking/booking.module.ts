import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module'
import { BookingComponent } from '../booking/booking.component';
import { ServiceSelectionComponent } from '../booking/service-selection/service-selection.component';
import { StaffSelectionComponent } from './staff-selection/staff-selection.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';
import { PublicModule } from '../public.module';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { TonysSharedModule } from '@tonys/shared';

@NgModule({
    declarations: [
        BookingComponent,
        ServiceSelectionComponent,
        StaffSelectionComponent,
        SlotSelectionComponent,
        BookingConfirmationComponent,
    ],
    imports: [
        SharedModule,
        PublicModule,
        TonysSharedModule.forRoot(),
    ],
    exports: []
  })
  export class BookingModule { }