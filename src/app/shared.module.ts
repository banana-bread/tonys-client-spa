import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule  } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { TonysSharedModule } from '@tonys-barbers/shared';
import { NgxMaskModule } from 'ngx-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ClientBookingCardComponent } from './views/client-bookings/client-booking-card/client-booking-card.component';

@NgModule({
  imports:[ 
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatListModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTabsModule,
    MatRippleModule,
    ScrollingModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    TonysSharedModule.forRoot('https://api.simplebarber.ca'),
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    ContactDialogComponent,
    NotFoundComponent,
    ConfirmDialogComponent,
    ClientBookingCardComponent,
  ],
  providers: [
    DecimalPipe,
    CurrencyPipe,
    { provide:MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatTabsModule,
    MatRippleModule,
    ScrollingModule,
    DecimalPipe,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxMaskModule,
    MatToolbarModule,
    MatMenuModule,
    ContactDialogComponent,
    NotFoundComponent,
    CurrencyPipe,
    ClientBookingCardComponent,
  ]
})
export class SharedModule { }
