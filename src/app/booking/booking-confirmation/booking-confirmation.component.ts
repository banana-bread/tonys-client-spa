import { Component, Input, OnInit } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot/time-slot.model';
import { BookingService } from 'src/app/models/booking/booking.service';
import { ClientService } from 'src/app/models/client/client.service';
import { AppStateService } from 'src/app/app-state.service';
import { SnackbarNotificationService } from '@tonys/shared';
import { Employee } from 'src/app/models/employee/employee.model';
import { Company } from 'src/app/models/company/company.model';
import * as moment from 'moment';
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

  loading = false;

  bookingEndTime: Date;
  bookingTotal: number;

  constructor(
    private clientService: ClientService,
    public appState: AppStateService,
    private bookingService: BookingService,
    private snackbarNotifications: SnackbarNotificationService,
  ) { }

  // TODO: check for auth here.
  ngOnInit(): void 
  {
    const bookingDuration = this.services.reduce((sum, service) => sum + service.duration, 0);
    this.bookingEndTime = moment(this.slot.start_time).add(bookingDuration ,'seconds').toDate();

    this.bookingTotal = this.services.reduce((total, service) => total + service.price, 0);
  }

  async createBooking()
  {
    this.appState.setLoading(true);

    try
    {
      const serviceIds: string[] = this.services.map(service => service.id);
      const client = await this.clientService.getAuthed();

      await this.bookingService.create(client.id, this.slot.id, serviceIds, this.company.id);


      // TODO: should re-route to a different view from here.. but WHERE?!?!
      // could be '/booking/confirmation'
      // Thank you for booking, you will get an email confirmation

      this.snackbarNotifications.success('Booking created!');
    }
    catch
    {
      this.snackbarNotifications.error('Error creating booking.');
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
