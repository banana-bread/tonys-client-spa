import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../models/time-slot.model';
import { TimeSlotService } from '../services/time-slot.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  timeSlots: TimeSlot[];

  constructor(private timeSlotService: TimeSlotService) {}

  ngOnInit(): void {
    this.timeSlotService.getAvailableTimeSlots()
      .subscribe((slots: any) => this.timeSlots = slots);
   }

   // FIXME: this doesn't work, think its being called before this.timeSlots
   //        is initialized 
  filterUnavailableDays(date: Date | null): boolean {
    return !this.timeSlots.some(slot => slot.start_time == date)
    // const day = (date || new Date().getDay());
    // return day !==0
  }

}

// getTimeSlots() {
//   this.timeSlotService.getAvailableTimeSlots()
//     .subscribe(res => console.log(res))
// }
// import {Component} from '@angular/core';
// import { TimeSlot } from '../models/time-slot.model';

// /** @title Datepicker with filter validation */
// @Component({
//   selector: 'datepicker-filter-example',
//   templateUrl: 'datepicker-filter-example.html',
// })
// export class DatepickerFilterExample {
//   myFilter = (d: Date | null): boolean => {
//     const day = (d || new Date()).getDay();
//     // Prevent Saturday and Sunday from being selected.
//     return day !== 0 && day !== 6;
//   }
// }