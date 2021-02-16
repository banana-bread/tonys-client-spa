import { Injectable } from '@angular/core';
import { TimeSlot } from '../models/time-slot.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './network/api.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(private api: ApiService) { }

  getAvailableTimeSlots(serviceIds: string[], dateFrom: string, dateTo: string, employeeId): Observable<TimeSlot> {
    return this.api.getAvailableTimeSlots(serviceIds, dateFrom, dateTo, employeeId)
      .pipe(map((response: any) => response.data.time_slots
        .map((time_slot: any) => new TimeSlot().deserialize(time_slot)))
      );
  }
}
TimeSlot