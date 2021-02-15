import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppointmentComponent } from './appointment/appointment.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
    declarations: [
        AppointmentComponent,
    ],
    imports: [
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        MatStepperModule,
    ],
    exports: [
        AppointmentComponent,
    ]
  })
  export class PrivateModule { }