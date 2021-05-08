import { Injectable } from '@angular/core';
// import { HttpAdapter } from './http-adapter.service';
import { HttpAdapter } from '@tonys/shared';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpAdapter) { }

  getAuthedClient(): Promise<any> 
  {
    return this.http
      .path('/client/authed')
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

  getServiceDefinitions(): Promise<any> 
  {
    return this.http
      .path('/service-definitions')
      .get();
  }

  // This technically logins in and/or registers... find a better name?
  loginWithProvider(provider: string): Promise<any> 
  {
    return this.http
      .path('/login/{provider}')
      .param('provider', provider)
      .get();
  }

  loginWithEmail(data: {username: string, password: string}): Promise<any>
  {
    return this.http
      .path('/login')
      .data(data)
      .post();
  }

  registerWithEmail(data: {name: string, email: string, password: string, phone?: string}): Promise<any>
  {
    return this.http
      .path('/clients')
      .data(data)
      .post();
  }

  getBooking(id: string): Promise<any>
  {
    return this.http
      .path('/bookings/{id}')
      .param('id', id)
      .get();
  }

  createBooking(data: {client_id: string, time_slot_id: number, service_definition_ids: string[]}): Promise<any>
  {
    return this.http
      .path('/bookings')
      .data(data)
      .post();
  }
}
