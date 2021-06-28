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
import { ActivatedRoute } from '@angular/router';

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

  selectedSlot: TimeSlot;
  openSlots: TimeSlot[];

  serviceGroup: FormGroup;
  staffGroup: FormGroup;

  // dateFilter = (date: Date): boolean => true;
  companyId = this.route.snapshot.paramMap.get('companyId');

  constructor(
    private timeSlotService: TimeSlotService,
    private employeeService: EmployeeService,
    private serviceDefinitionService: ServiceDefinitionService,
    private appState: AppStateService,
    private route: ActivatedRoute,
  ) {}   

  async ngOnInit(): Promise<void> 
  {
    this.employees = await this.employeeService.getAll(this.companyId);
    this.serviceDefinitions = await this.serviceDefinitionService.getAll(this.companyId);

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

  goToStaffSelection()
  {
    this.stepper.next()
  }

  async onStaffSelected(id: string)
  {
    this.loading = true;

    this.selectedEmployee = this.getSelectedEmployee(id);
    this.openSlots = await this.getOpenSlots();

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
      serviceIds, dateFrom, dateTo, this.selectedEmployee.id, this.companyId
    );
  }
}
