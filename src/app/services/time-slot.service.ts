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

  async getAvailableTimeSlots(serviceIds: string[], dateFrom: string, dateTo: string, employeeId): Promise<TimeSlot[]> 
  {
    const response = await this.api.getAvailableTimeSlots(
      serviceIds, dateFrom, dateTo, employeeId
    );
    
    return response.data.time_slots
      .map(slot => new TimeSlot().deserialize(slot));
  }
}
TimeSlot