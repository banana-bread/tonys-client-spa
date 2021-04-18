import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpAdapter } from './http-adapter.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpAdapter) { }

  getAuthedClient(): Promise<any> 
  {
    return this.http
      .path('/authed/client')
      .get();
  }

  getAvailableTimeSlots(serviceIds: string[], dateFrom: string, dateTo: string, employeeId: string = ''): Promise<any> 
  {
    return this.http
      .path('/time-slots')
      .query('service-definition-ids', serviceIds)
      .query('employee-id', employeeId)
      .query('date-from', dateFrom)
      .query('date-to', dateTo)
      .get();
  }

  getEmployees(): Promise<any> 
  {
    return this.http  
      .path('/employees')
      .get();
  }

  getEmployee(id: string): Promise<any> 
  {
    return this.http
      .path('/employees/{id}')
      .param('id', id)
      .get();
  }

  getServiceDefinitions(): Promise<any> {
    return this.http
      .path('/service-definitions')
      .get();
  }
}
