import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module'
import { BookingComponent } from '../booking/booking.component';
import { ServiceSelectionComponent } from '../booking/service-selection/service-selection.component';
import { StaffSelectionComponent } from './staff-selection/staff-selection.component';
import { SlotSelectionComponent } from './slot-selection/slot-selection.component';

@NgModule({
    declarations: [
        BookingComponent,
        ServiceSelectionComponent,
        StaffSelectionComponent,
        SlotSelectionComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: []
  })
  export class BookingModule { }