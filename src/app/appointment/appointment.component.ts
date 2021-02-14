import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../models/time-slot.model';
import { TimeSlotService } from '../services/time-slot.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  timeSlots: TimeSlot[];
  selectedDate: FormControl = new FormControl();
  selectedDatesSlots: TimeSlot[];
  dateFilter = (date: Date): boolean => true;

  constructor(private timeSlotService: TimeSlotService) {}   

  ngOnInit(): void {
    this.timeSlotService.getAvailableTimeSlots()
      .subscribe((slots: any) => { 
        this.timeSlots = slots;
        
        this.dateFilter = (date: Date | null): boolean => {
          const day = (date || new Date())

          return this.filterUnavailableDays(day)
        }
      });
   }

  filterUnavailableDays(date: Date | null): boolean {
    return !!this.timeSlots.find(slot => {
      const timeSlotDay = moment(slot.start_time).startOf('day');
      const datePickerDay = moment(date).startOf('day');

      return datePickerDay.isSame(timeSlotDay);
    })
  }


  onDateChanged(event) {
    this.selectedDatesSlots = this.timeSlots.filter(slot => {
      const selectedDate = moment(this.selectedDate.value).startOf('day');
      const slotDate = moment(slot.start_time).startOf('day');
      
      return selectedDate.isSame(slotDate);
    })
  }
}
