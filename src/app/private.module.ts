import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookingComponent } from './booking/booking.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule  } from '@angular/material/divider';

@NgModule({
    declarations: [
        BookingComponent,
    ],
    imports: [
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
    ],
    exports: [
        BookingComponent,
    ]
  })
  export class PrivateModule { }