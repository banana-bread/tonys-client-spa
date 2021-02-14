import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  
  getAuthedClient(): Observable<Client> {
    return this.http.get('http://localhost:89/authed/client')
      .pipe(map((response: any) => new Client().deserialize(response.data)))
  }
}