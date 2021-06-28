import { Component, Input, OnInit } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot/time-slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/models/booking/booking.service';
import { ClientService } from 'src/app/models/client/client.service';
import { AppStateService } from 'src/app/app-state.service';
import { SnackbarNotificationService } from '@tonys/shared';
import { ActivatedRoute } from '@angular/router';
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

  companyId = this.route.snapshot.paramMap.get('companyId');

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
    private bookingService: BookingService,
    private appState: AppStateService,
    private snackbarNotifications: SnackbarNotificationService,
    private route: ActivatedRoute,
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
      const client = await this.clientService.getAuthed();

      await this.bookingService.create(client.id, this.slot.id, serviceIds, this.companyId);


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
      this.setLoading(false);
    }
  }

  protected setLoading(isLoading: boolean)
  {
    this.loading = isLoading;
    this.appState.setLoading(this.loading);
  }
}
