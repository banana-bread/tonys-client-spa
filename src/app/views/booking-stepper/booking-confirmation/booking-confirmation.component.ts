import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AppStateService } from 'src/app/services/app-state.service';
import { SnackbarNotificationService } from '@tonys-barbers/shared';
import { Employee } from 'src/app/models/employee.model';
import { Company } from 'src/app/models/company.model';
import * as moment from 'moment';
import { ReCaptchaService } from 'angular-recaptcha3';
import { ApiService } from 'src/app/services/api.service';
import { Client } from 'src/app/models/client.model';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  @Input() slot: TimeSlot;
  @Input() services: ServiceDefinition[];
  @Input() employee: Employee;
  @Input() company: Company;
  @Output() booked = new EventEmitter<void>();

  loading = false;
  isBookingConfirmed = false;

  bookingEndTime: Date;
  tax: number;
  bookingTotal: number;
  booking = new Booking()

  constructor(
    public appState: AppStateService,
    private snackbarNotifications: SnackbarNotificationService,
    private apiService: ApiService,
    private recaptchaService: ReCaptchaService,
  ) { }

  async ngOnInit(): Promise<void> 
  {
    const bookingDuration = this.services.reduce((sum, service) => sum + service.duration, 0);
    this.bookingEndTime = moment(this.slot.start_time).add(bookingDuration ,'seconds').toDate();

    const subTotal = this.services.reduce((total, service) => total + service.price, 0);
    this.tax = subTotal * 0.13;
    this.bookingTotal = subTotal + this.tax; 
  }

  async createBooking()
  {
    this.appState.setLoading(true);

    const client = await Client.authed()

    this.booking.client_id = client.id
    this.booking.time_slot_id = this.slot.id
    this.booking.services = this.services
    this.booking.client = client

    try
    {
      const token = await this.recaptchaService.execute();
      const response = await this.apiService.verifyRecaptcha({token});

      if (! response.data.success)
      {
        this.snackbarNotifications.error('We detected a robot.')
        return;
      }
     
      await this.booking.save()
      this.isBookingConfirmed = true;
      this.booked.emit();
      this.snackbarNotifications.success('Booking created!');
    }
    catch (e)
    {
      this.snackbarNotifications.error(e.error.message);
    }
    finally
    {
      this.appState.setLoading(false);
    }
  }

  protected setLoading(isLoading: boolean)
  {
    this.loading = isLoading;
    this.appState.setLoading(this.loading);
  }
}
