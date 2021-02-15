import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAdapter } from './http-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpAdapter) { }

  getAuthedClient(): Observable<any> {
    return this.http
      .path('/authed/client')
      .get();
  }

  getAvailableTimeSlots(serviceIds: string[], dateFrom: string, dateTo: string, employeeId: string = ''): Observable<any> {
    return this.http
      .path('/time-slots')
      .query('service-definition-ids', serviceIds)
      .query('employee-id', employeeId)
      .query('date-from', dateFrom)
      .query('date-to', dateTo)
      .get();
  }
}
