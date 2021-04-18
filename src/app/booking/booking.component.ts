import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeSlot } from '../models/time-slot.model';
import { TimeSlotService } from '../services/time-slot.service';
import * as moment from 'moment';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ServiceDefinitionService } from '../services/service-definition.service';
import { ServiceDefinition } from '../models/service-definition.model';
import { MatStepper } from '@angular/material/stepper';
import { DayCollection } from '../helpers/day-collection.helper';
import { Dictionary, get } from 'lodash';
import { FormGroup } from '@angular/forms';

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

  employees: Employee[];
  serviceDefinitions: ServiceDefinition[];
  selectedDate: Date;
  selectedDatesSlots: TimeSlot[];
  selectedSlot: TimeSlot;
  selectedServices: ServiceDefinition[];
  selectedEmployee;
  days: moment.Moment[];
  groupedSlots: Dictionary<TimeSlot[]>

  serviceGroup: FormGroup;
  staffGroup: FormGroup;

  constructor(
    private timeSlotService: TimeSlotService,
    private employeeService: EmployeeService,
    private serviceDefinitionService: ServiceDefinitionService,
  ) {}   

  async ngOnInit(): Promise<void> 
  {
    this.employees = await this.employeeService.getEmployees();
    this.serviceDefinitions = await this.serviceDefinitionService.getServiceDefinitions();
  }  

  // filterUnavailableDays(date: Date | null): boolean {
  //   return !!this.timeSlots.find(slot => 
  //     const timeSlotDay = moment(slot.start_time).startOf('day');
  //     const datePickerDay = moment(date).startOf('day');

  //     return datePickerDay.isSame(timeSlotDay);
  //   })
  // }

  // onDateSelected(event) {
  //   this.selectedDate = event
  //   this.selectedDatesSlots = this.timeSlots.filter(slot => {
  //     const selectedDate = moment(this.selectedDate).startOf('day');
  //     const slotDate = moment(slot.start_time).startOf('day');
      
  //     return selectedDate.isSame(slotDate);
  //   });

  //   this.selectedSlot = null;
  // }

  onSlotSelected(slot: TimeSlot) 
  {
    this.selectedSlot = slot;
  }

  goToServiceProviderStep(stepper: MatStepper) 
  {
    stepper.next();
  }

  slotsFor(day: moment.Moment)
  {
    return get(this.groupedSlots, day.format('l'));
  }

  onServiceSelected() 
  {
    this.selectedServices = this.serviceDefinitions.filter(service => service.selected)
  }

  async onStaffSelected(id: string)
  {
    this.selectedEmployee = this.getSelectedEmployee(id);
    const slots = await this.getOpenSlots();
    this.days = DayCollection.fromSlots(slots);
    this.groupedSlots = TimeSlot.group(slots);

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
    
    return await this.timeSlotService.getAvailableTimeSlots(
      serviceIds, dateFrom, dateTo, this.selectedEmployee.id
    )
  }

  // isMorning(slot: TimeSlot) {
  //   return moment(slot.start_time).hour() < 12;
  // }
}
