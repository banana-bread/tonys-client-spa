import { Component, Input, OnInit } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot.model';
import { AuthService } from 'src/app/services/auth/auth/auth.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {

  @Input() slots: TimeSlot[];
  @Input() services: ServiceDefinition[];

  component: string;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void 
  {
    this.component = this.auth.isLoggedIn()
      ? 'secure booking!!'
      : 'login/register!!'
  }

  async onGoogleAuth()
  {
    await this.auth.loginWithProvider('google');
  }

  /*
  TODO: Login shouldn't happen in this component.  This component should be responsible for
        rendering the login/register component if user is not logged in already 
  */

}
