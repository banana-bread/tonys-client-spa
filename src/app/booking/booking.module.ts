import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module'
import { BookingComponent } from '../booking/booking.component';
import { ServiceSelectionComponent } from '../booking/service-selection/service-selection.component';
import { StaffSelectionComponent } from './staff-selection/staff-selection.component';

@NgModule({
    declarations: [
        BookingComponent,
        ServiceSelectionComponent,
        StaffSelectionComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        BookingComponent,
        ServiceSelectionComponent,
    ]
  })
  export class BookingModule { }