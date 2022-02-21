import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeSlot } from '../../models/time-slot/time-slot.model';
import { TimeSlotService } from '../../models/time-slot/time-slot.service';
import * as moment from 'moment';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EmployeeService } from '../../models/employee/employee.service';
import { Employee } from '../../models/employee/employee.model';
import { ServiceDefinitionService } from '../../models/service-definition/service-definition.service';
import { ServiceDefinition } from '../../models/service-definition/service-definition.model';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/app-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../models/company/company.model';
import { CompanyService } from '../../models/company/company.service';
import { AuthService } from '../../services/auth.service';
import { SnackbarNotificationService } from '@tonys-barbers/shared';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class BookingComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  loading = false;
  appLoading = false;
  appLoadingChanges: Subscription;

  employees: Employee[];
  employeesOriginal: Employee[];
  selectedEmployee: Employee;
  selectedSlotEmployee: Employee;
  company: Company;

  serviceDefinitions: ServiceDefinition[];
  selectedServices: ServiceDefinition[];

  selectedSlot: TimeSlot;
  openSlots: TimeSlot[];

  serviceGroup: FormGroup;
  staffGroup: FormGroup;

  isBookingConfirmed = false;
  companyExists = true;

  companyId = this.route.snapshot.paramMap.get('companyId');
  companySlug = this.route.snapshot.paramMap.get('companySlug');

  constructor(
    private timeSlotService: TimeSlotService,
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    public appState: AppStateService,
    private auth: AuthService,
    private route: ActivatedRoute,
  ) {}   

  async ngOnInit(): Promise<void> 
  {
    this.loading = true;

    try
    {
      this.company = this.companySlug 
        ? await this.companyService.getBySlug(this.companySlug)
        : await this.companyService.get(this.companyId);

      this.employeesOriginal = this.company.employees;
      this.employees = cloneDeep(this.employeesOriginal);
      this.serviceDefinitions = this.company.service_definitions;
    }
    catch (e)
    {
      this.companyExists = false;
    }
    finally
    {
      this.loading = false;
    }
  }  

  async onSlotSelected(slot: TimeSlot): Promise<void>
  {
    this.appState.setLoading(true);
    this.selectedSlot = slot;

    try
    {
      this.selectedSlotEmployee = await this.employeeService.get(slot.employee_id, this.company.id);
    }
    finally 
    {
      this.appState.setLoading(false);
    }

    this.stepper.next();
  }

  onServiceSelected() 
  {
    this.selectedServices = this.serviceDefinitions.filter(service => service.selected)

    // Filters out employees that cannot perform all selected services.
    this.employees = this.employeesOriginal.filter(
      employee => this.selectedServices.every(
        service => service.employee_ids.some(id => employee.id == id)
      )
    )
  }

  goToStaffSelection()
  {
    this.stepper.next()
  }

  async onStaffSelected(id: string)
  {
    this.appState.setLoading(true);

    this.selectedEmployee = this.getSelectedEmployee(id);
    this.openSlots = await this.getOpenSlots();

    this.appState.setLoading(false);
    this.stepper.next();
  }

  onBookingConfirmed()
  {
    this.isBookingConfirmed = true;
  }

  private getSelectedEmployee(id: string): Employee
  {
    return this.selectedEmployee = id === 'any'
       ? new Employee()
       : this.employees.find(e => e.id === id);
  }

  private async getOpenSlots(): Promise<TimeSlot[]>
  {
    // TODO: this 50 days should be paginated, as well as a setting which
    //       specifies max number of days into the future clients can book
    //       for.
    const dateFrom = moment().startOf('day').unix().toString();
    const dateTo = moment().endOf('day').add(50, 'days').unix().toString();
    const serviceIds = this.selectedServices.map(service => service.id);
  
    return await this.timeSlotService.getAllAvailable(
      serviceIds, dateFrom, dateTo, this.selectedEmployee.id, this.company.id
    );
  }
}