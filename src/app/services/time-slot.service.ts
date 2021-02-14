import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeSlot } from '../models/time-slot.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(private http: HttpClient) { }

  getAvailableTimeSlots(): Observable<TimeSlot> {
    return this.http.get('http://localhost:89/time-slots?service-definition-ids=1,3&employee-id=&date-from=1613260800&date-to=1613779200')
      .pipe(
        map((response: any) => response.data.time_slots.
          map((time_slot: any) => new TimeSlot().deserialize(time_slot))
        )
      )
  }
}
