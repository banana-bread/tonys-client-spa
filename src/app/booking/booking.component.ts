import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../models/time-slot.model';
import { TimeSlotService } from '../services/time-slot.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { ServiceDefinitionService } from '../services/service-definition.service';
import { ServiceDefinition } from '../models/service-definition.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class BookingComponent implements OnInit {
  timeSlots: TimeSlot[];
  employees: Employee[];
  serviceDefinitions: ServiceDefinition[];
  selectedDate: Date;
  selectedDatesSlots: TimeSlot[];
  selectedSlot: TimeSlot;
  selectedServices: ServiceDefinition[];
  selectedProvider: any[];

  dateFilter = (date: Date): boolean => true;

  constructor(private timeSlotService: TimeSlotService,
              private employeeService: EmployeeService,
              private serviceDefinitionService: ServiceDefinitionService) {}   

  ngOnInit(): void {
    this.employeeService.getEmployees()
      .subscribe((employees: any) => this.employees = employees);

    this.serviceDefinitionService.getServiceDefinitions()
      .subscribe((serviceDefinitions: any) => this.serviceDefinitions = serviceDefinitions);
  }

  filterUnavailableDays(date: Date | null): boolean {
    return !!this.timeSlots.find(slot => {
      const timeSlotDay = moment(slot.start_time).startOf('day');
      const datePickerDay = moment(date).startOf('day');

      return datePickerDay.isSame(timeSlotDay);
    })
  }

  onDateSelected(event) {
    this.selectedDate = event
    this.selectedDatesSlots = this.timeSlots.filter(slot => {
      const selectedDate = moment(this.selectedDate).startOf('day');
      const slotDate = moment(slot.start_time).startOf('day');
      
      return selectedDate.isSame(slotDate);
    });

    this.selectedSlot = null;
  }

  onSlotSelected(slot: TimeSlot) {
    this.selectedSlot = slot;
  }

  goToServiceProviderStep(stepper: MatStepper) {
    stepper.next();
  }

  goToDateSelectionStep(stepper: MatStepper) {
    const serviceIds = this.selectedServices.map(service => service.id);
    const selectedProviderId = 
      this.selectedProvider[0] === 'any'
        ? ''
        : this.selectedProvider[0].id;
    
    const dateFrom = moment().unix().toString();
    const dateTo = moment().add(30, 'days').unix().toString();
    
    this.timeSlotService.getAvailableTimeSlots(serviceIds, dateFrom, dateTo, selectedProviderId)
      .subscribe((slots: any) => { 
        this.timeSlots = slots;

        this.dateFilter = (date: Date | null): boolean => {
          const day = (date || new Date())
          return this.filterUnavailableDays(day)
        }

        stepper.next();
      });
  }

  updateSelectedServices() {
    this.selectedServices = this.serviceDefinitions.filter(service => service.selected)
  }

  // isMorning(slot: TimeSlot) {
  //   return moment(slot.start_time).hour() < 12;
  // }
}
