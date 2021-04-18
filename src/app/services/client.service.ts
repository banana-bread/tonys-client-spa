import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './network/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private api: ApiService) { }
  
  async getAuthedClient(): Promise<Client> {
   const response = await this.api.getAuthedClient();
   return new Client().deserialize(response.data);
  }
}