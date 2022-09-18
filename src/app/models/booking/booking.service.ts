import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // TODO: should be a model

  constructor(private api: ApiService) { }

  async create(clientId: string, timeSlotId: number, serviceIds: string[], companyId: string, note: string): Promise<Booking>
  {
    const response = await this.api.createBooking({
      client_id: clientId, 
      time_slot_id: timeSlotId, 
      service_definition_ids: serviceIds,
      note: note,
    }, companyId);

    return new Booking(response.data.booking);
  }

  async get(id: string): Promise<Booking>
  {
    return new Booking();
    // const response = await this.api.getBooking(id);
    // return new Booking(response.data);
  }

  async cancel(booking: Booking): Promise<any>
  {
    const response = await this.api.cancelBooking(booking.id);
    
    return response;
  }
}
