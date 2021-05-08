import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { ApiService } from '../../services/api.service';

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
}
