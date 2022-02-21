import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { ApiService } from '../../services/api.service';
import { Booking } from '../booking/booking.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ApiService) { }
  
  async getAuthed(): Promise<Client> 
  {
   const response = await this.api.getAuthedClient();
   return new Client(response.data.client);
  }

  async getUpcomingBookings(client: Client): Promise<Booking[]>
  {
    const dateFrom = moment().unix().toString();
    const dateTo = moment().add(60, 'days').unix().toString();
    this.api.getClientBookings(client.id, dateFrom, dateTo);
    return []
  }

  async getPastBookings(client: Client): Promise<Booking[]>
  {
    // currently will only show bookings for past year
    const dateFrom = moment().subtract(365, 'days').unix().toString();
    const dateTo = moment().unix().toString();
    this.api.getClientBookings(client.id, dateFrom, dateTo);
    return []
  }
}
