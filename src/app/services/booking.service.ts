import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { ApiService } from './network/api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private api: ApiService) { }

  async createBooking(clientId: string, timeSlotId: string, serviceIds: string[]): Promise<Booking>
  {
    const response = await this.api.createBooking({clientId, timeSlotId, serviceIds});
    return new Booking().deserialize(response.data);
  }

  async getBooking(id: string): Promise<Booking>
  {
    const response = await this.api.getBooking(id);
    return new Booking().deserialize(response.data);
  }
}
