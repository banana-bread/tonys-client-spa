import { Injectable } from '@angular/core';
import { TimeSlot } from './time-slot.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  constructor(private api: ApiService) { }

  async getAllAvailable(serviceIds: string[], dateFrom: string, dateTo: string, employeeId: string, companyId: string): Promise<TimeSlot[]> 
  {
    const response = await this.api.getAvailableTimeSlots(
      serviceIds, dateFrom, dateTo, employeeId, companyId
    );
    
    return response.data.time_slots
      .map((slot: any) => new TimeSlot(slot));
  }
}
TimeSlot