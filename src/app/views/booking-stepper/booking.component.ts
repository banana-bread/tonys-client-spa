import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeSlot } from '../../models/time-slot.model';
import * as moment from 'moment';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EmployeeService } from '../../models/employee/employee.service';
import { Employee } from '../../models/employee/employee.model';
import { ServiceDefinition } from '../../models/service-definition.model';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/app-state.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../models/company.model';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
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

  // TODO: this could just be included on the booking model itself
  isBookingConfirmed = false;
  companyExists = true;

  companyId = this.route.snapshot.paramMap.get('companyId');
  companySlug = this.route.snapshot.paramMap.get('companySlug');

  constructor(
    private employeeService: EmployeeService,
    public appState: AppStateService,
    private route: ActivatedRoute,
  ) {}   

  async ngOnInit(): Promise<void> 
  {
    this.loading = true;

    try
    {
      this.company = this.companySlug 
        ? await Company.findBySlug(this.companySlug)
        : await Company.find(this.companyId)

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
    const params = {
      services: this.selectedServices,
      dateFrom: moment().startOf('day').unix().toString(),
      dateTo: moment().endOf('day').add(50, 'days').unix().toString(),
      employee: this.selectedEmployee,
      company: this.company,
    }

    return await TimeSlot.all(params)
  }
}
