import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TimeSlot } from '../models/time-slot/time-slot.model';
import { TimeSlotService } from '../models/time-slot/time-slot.service';
import * as moment from 'moment';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EmployeeService } from '../models/employee/employee.service';
import { Employee } from '../models/employee/employee.model';
import { ServiceDefinitionService } from '../models/service-definition/service-definition.service';
import { ServiceDefinition } from '../models/service-definition/service-definition.model';
import { MatStepper } from '@angular/material/stepper';
import { DayCollection } from '../helpers/day-collection.helper';
import { Dictionary } from 'lodash';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class BookingComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') stepper: MatStepper;

  loading = false;
  appLoading = false;
  appLoadingChanges: Subscription;

  employees: Employee[];
  selectedEmployee: Employee;

  serviceDefinitions: ServiceDefinition[];
  selectedServices: ServiceDefinition[];

  groupedSlots: Dictionary<TimeSlot[]>
  selectedSlot: TimeSlot;
  days: moment.Moment[];

  serviceGroup: FormGroup;
  staffGroup: FormGroup;

  constructor(
    private timeSlotService: TimeSlotService,
    private employeeService: EmployeeService,
    private serviceDefinitionService: ServiceDefinitionService,
    private appState: AppStateService,
  ) {}   

  async ngOnInit(): Promise<void> 
  {
    this.employees = await this.employeeService.getAll();
    this.serviceDefinitions = await this.serviceDefinitionService.getAll();

    this.appLoadingChanges = this.appState.loading.subscribe(loading => this.appLoading = loading);
  }  

  ngOnDestroy()
  {
    this.appLoadingChanges.unsubscribe();
  }

  onSlotSelected(slot: TimeSlot) 
  {
    this.selectedSlot = slot;
    this.stepper.next();
  }

  onServiceSelected() 
  {
    this.selectedServices = this.serviceDefinitions.filter(service => service.selected)
  }

  async onStaffSelected(id: string)
  {
    this.loading = true;

    this.selectedEmployee = this.getSelectedEmployee(id);
    const slots = await this.getOpenSlots();
    this.days = DayCollection.fromSlots(slots);
    this.groupedSlots = TimeSlot.group(slots);

    this.loading = false;
    this.stepper.next();
  }

  private getSelectedEmployee(id: string): Employee
  {
    return this.selectedEmployee = id === 'any'
       ? new Employee()
       : this.employees.find(e => e.id === id);
  }

  private async getOpenSlots(): Promise<TimeSlot[]>
  {
    const dateFrom = moment().startOf('day').unix().toString();
    // TODO: this 30 should be a setting of sorts
    const dateTo = moment().endOf('day').add(30, 'days').unix().toString();
    const serviceIds = this.selectedServices.map(service => service.id);
  
    return await this.timeSlotService.getAllAvailable(
      serviceIds, dateFrom, dateTo, this.selectedEmployee.id
    );
  }
}
