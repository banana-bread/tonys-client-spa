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
  
  getAuthedClient(): Observable<Client> {
    return this.api.getAuthedClient()
      .pipe(
        map((response: any) => new Client().deserialize(response.data))
      );
  }
}