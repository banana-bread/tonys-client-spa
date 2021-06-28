import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { get } from 'lodash';
import * as moment from 'moment';
import { TimeSlot } from 'src/app/models/time-slot/time-slot.model';

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss']
})
export class SlotSelectionComponent implements OnInit {

  @Input() slots: TimeSlot[];
  @Output() selected = new EventEmitter<TimeSlot>();

  selectedDate: Date;
  selectedDateSlots;
  selectedSlot: TimeSlot;
  dateFilter = (date: Date): boolean => true;


  constructor() { }

  ngOnInit(): void 
  {
    this.dateFilter = (date: Date | null): boolean => {
      const day = (date || new Date())
      return this.filterUnavailableDays(day)
    }
  }

  filterUnavailableDays(date: Date|null): boolean 
  {
    return !!this.slots.find(slot => {
      const timeSlotDay = moment(slot.start_time).startOf('day');
      const datePickerDay = moment(date).startOf('day');

      return datePickerDay.isSame(timeSlotDay);
    })
  }

  onDateSelected(date: Date) {
    this.selectedDate = date
    this.selectedDateSlots = this.slots.filter(slot => {
      const selectedDate = moment(this.selectedDate).startOf('day');
      const slotDate = moment(slot.start_time).startOf('day');

      return selectedDate.isSame(slotDate);
    });

    this.selectedSlot = null;
  }

  slotsFor(day: moment.Moment)
  {
    return get(this.slots, day.format('l'));
  }

  onSelected(slot: TimeSlot)
  {
    this.selected.emit(slot);
  }

}
