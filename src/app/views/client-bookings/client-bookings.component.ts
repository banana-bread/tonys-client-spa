import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-bookings',
  templateUrl: './client-bookings.component.html',
  styleUrls: ['./client-bookings.component.scss']
})
export class ClientBookingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // 1. load upcoming bookings for authed user
    // 2. load past bookings for authed user
  }

}
