import { Component, Input, OnInit } from '@angular/core';
import { ServiceDefinition } from 'src/app/models/service-definition/service-definition.model';
import { TimeSlot } from 'src/app/models/time-slot/time-slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/models/booking/booking.service';
import { ClientService } from 'src/app/models/client/client.service';
import { AppStateService } from 'src/app/app-state.service';
import { SnackbarNotificationService } from '@tonys/shared';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee/employee.model';
import { EmployeeService } from 'src/app/models/employee/employee.service';
import { CompanyService } from 'src/app/models/company/company.service';
import { Company } from 'src/app/models/company/company.model';
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

  employee = new Employee();
  company = new Company();
  companyId = this.route.snapshot.paramMap.get('companyId');

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
    public appState: AppStateService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private bookingService: BookingService,
    private snackbarNotifications: SnackbarNotificationService,
    private route: ActivatedRoute,
  ) { }

  /*
    TODO:
      - [ ] Add in time of appointment (start - end)
      - [ ] disabled reserve button on appState loading
  */
  async ngOnInit(): Promise<void> 
  {
    this.loading = true;
    this.appState.setLoggedIn(this.auth.isLoggedIn())

    try
    {
      this.employee = await this.employeeService.get(this.slot.employee_id, this.companyId);
      this.company = await this.companyService.get(this.companyId);
    }
    finally 
    {
      this.loading = false;
    }
  }
  async createBooking()
  {
    this.appState.setLoading(true);

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
      this.appState.setLoading(false);
    }
  }

  protected setLoading(isLoading: boolean)
  {
    this.loading = isLoading;
    this.appState.setLoading(this.loading);
  }
}
