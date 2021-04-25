import { Component, Input, OnInit } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  @Input() slots: TimeSlot[];
  @Input() services: ServiceDefinition[];

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  async onGoogleAuth()
  {
    await this.auth.loginWithProvider('google');
  }

}
