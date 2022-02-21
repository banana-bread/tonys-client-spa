import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { ApiService } from '../../services/api.service';
import { Booking } from '../booking/booking.model';

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
    return []
  }

  async getPastBookings(client: Client): Promise<Booking[]>
  {
    return []
  }
}
