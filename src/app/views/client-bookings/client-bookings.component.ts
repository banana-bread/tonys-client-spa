import { Component, OnInit } from '@angular/core';
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

  constructor(
    private appState: AppStateService,
    // private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.client = this.appState.authedClient;
    // this.clientService.
    // 1. load upcoming bookings for authed user

    // 2. load past bookings for authed user
  }

}
