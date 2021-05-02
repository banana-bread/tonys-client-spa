import { Component, Input, OnInit } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { ClientService } from 'src/app/services/client.service';
import { AppStateService } from 'src/app/app-state.service';
import { SnackbarNotificationService } from 'src/app/services/notifications/snackbar-notifications/snackbar-notification.service';
@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  @Input() slot: TimeSlot;
  @Input() services: ServiceDefinition[];

  isLoggedIn: boolean;
  loading = false;

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
    private bookingService: BookingService,
    private appState: AppStateService,
    private snackbarNotifications: SnackbarNotificationService,
  ) { }

  ngOnInit(): void 
  {
    // turn this into an observable?
    this.updateLoggedIn();
  }

  updateLoggedIn()
  {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  async createBooking()
  {
    this.setLoading(true);

    // TODO: not working, figure out why
    try
    {
      const serviceIds: string[] = this.services.map(service => service.id);
      const client = await this.clientService.getAuthedClient();
      await this.bookingService.createBooking(client.id, this.slot.id, serviceIds);

      this.snackbarNotifications.success('Booking created!');
    }
    catch
    {
      this.snackbarNotifications.error('Error creating booking.');
    }
    finally
    {
      this.setLoading(false);
    }
  }

  protected setLoading(isLoading: boolean)
  {
    this.loading = isLoading;
    this.appState.setLoading(this.loading);
  }
}
