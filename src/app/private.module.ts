import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module'
import { BookingComponent } from './booking/booking.component';

@NgModule({
    declarations: [
        BookingComponent,
    ],
    imports: [
        SharedModule,

    ],
    exports: [
        BookingComponent,
    ]
  })
  export class PrivateModule { }