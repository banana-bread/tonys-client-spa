import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { ApiService } from './network/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private api: ApiService) { }

  async createBooking(clientId: string, timeSlotId: number, serviceIds: string[]): Promise<Booking>
  {
    const response = await this.api.createBooking({
      client_id: clientId, 
      time_slot_id: timeSlotId, 
      service_definition_ids: serviceIds,
    });
    // console.log(response.data)
    const booking =  new Booking(response.data);
    console.log(booking)
    return booking;
  }

  async getBooking(id: string): Promise<Booking>
  {
    const response = await this.api.getBooking(id);
    return new Booking(response.data);
  }
}
