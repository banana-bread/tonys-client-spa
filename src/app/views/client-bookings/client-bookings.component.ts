import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/models/booking/booking.model';
import { Client } from 'src/app/models/client/client.model';
import { ClientService } from 'src/app/models/client/client.service';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-client-bookings',
  templateUrl: './client-bookings.component.html',
  styleUrls: ['./client-bookings.component.scss']
})
export class ClientBookingsComponent implements OnInit, OnDestroy {

  client = new Client();
  clientSubscription: Subscription;
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];

  constructor(
    private appState: AppStateService,
    private clientService: ClientService,
  ) { }

  async ngOnInit(): Promise<void> 
  {
    this.client = this.appState.authedClient;

    this.clientSubscription = this.appState.authedClient$
      .subscribe(async (response) => {
        if (!response.id) return;

        this.client = new Client(response);
        this.upcomingBookings = await this.clientService.getUpcomingBookings(this.client);
        this.pastBookings = await this.clientService.getPastBookings(this.client);
    
    })
  }

  ngOnDestroy(): void 
  {
    this.clientSubscription.unsubscribe();
  }

  canCancel(booking: Booking): boolean
  {
    return !booking.cancelled_at || moment(booking.started_at).isSameOrBefore(moment());
  }

  onCancelBooking(booking: Booking) 
  {
    console.log(booking)
    console.error('onCancelBooking not implemented')
  }
}
