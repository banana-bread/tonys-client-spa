import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
    declarations: [
        AppointmentComponent,
    ],
    imports: [
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],
    exports: [
        AppointmentComponent,
    ]
  })
  export class PrivateModule { }