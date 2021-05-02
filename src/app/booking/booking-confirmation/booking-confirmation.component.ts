import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AuthService } from 'src/app/services/auth/auth/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  @Input() slot: TimeSlot;
  @Input() services: ServiceDefinition[];

  isLoggedIn: boolean;

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void 
  {
    this.updateLoggedIn();
  }

  updateLoggedIn()
  {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  async createBooking()
  {
    const serviceIds: string[] = this.services.map(service => service.id);
    const client = await this.clientService.getAuthedClient();

    this.bookingService.createBooking(client.id, this.slot.id, serviceIds);
  }
}
