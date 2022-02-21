import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking/booking.model';
import { Client } from 'src/app/models/client/client.model';
import { ClientService } from 'src/app/models/client/client.service';
import { AppStateService } from 'src/app/services/app-state.service';

@Component({
  selector: 'app-client-bookings',
  templateUrl: './client-bookings.component.html',
  styleUrls: ['./client-bookings.component.scss']
})
export class ClientBookingsComponent implements OnInit {

  client = new Client();
  upcomingBookings: Booking[] = [];
  pastBookings: Booking[] = [];

  constructor(
    private appState: AppStateService,
    private clientService: ClientService,
  ) { }

  async ngOnInit(): Promise<void> 
  {
    this.client = this.appState.authedClient;
    this.upcomingBookings = await this.clientService.getUpcomingBookings(this.client);
    this.pastBookings = await this.clientService.getPastBookings(this.client);
  }

}
