import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dictionary, get } from 'lodash';
import * as moment from 'moment';
import { TimeSlot } from 'src/app/models/time-slot/time-slot.model';

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss']
})
export class SlotSelectionComponent implements OnInit {

  @Input() days: moment.Moment[];
  @Input() slots: Dictionary<TimeSlot[]>;  
  @Output() selected = new EventEmitter<TimeSlot>();

  constructor() { }

  ngOnInit(): void {
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
