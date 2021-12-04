import { Injectable } from '@angular/core';
import { HttpAdapter } from '@tonys-barbers/shared';

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

  getAvailableTimeSlots(serviceIds: string[], dateFrom: string, dateTo: string, employeeId: string = '', companyId: string): Promise<any> 
  {
    return this.http
      .path('/time-slots')
      .withCompany(companyId)
      .query('service-definition-ids', serviceIds)
      .query('employee-id', employeeId)
      .query('date-from', dateFrom)
      .query('date-to', dateTo)
      .get();
  }

  getEmployees(companyId: string): Promise<any> 
  {
    return this.http  
      .path('/booking/employees')
      .withCompany(companyId)
      .get();
  }

  getEmployee(id: string, companyId: string): Promise<any> 
  {
    return this.http
      .path('/employees/{id}')
      .withCompany(companyId)
      .param('id', id)
      .get();
  }

  getServiceDefinitions(companyId: string): Promise<any> 
  {
    return this.http
      .path('/service-definitions')
      .withCompany(companyId)
      .get();
  }

  getCompany(id: string): Promise<any>
  {
    return this.http  
      .path('/locations/{id}')
      .param('id', id)
      .get();
  }

  // This technically logins in and/or registers... find a better name?
  loginWithProvider(provider: string): Promise<any> 
  {
    return this.http
      .path('/client/login/{provider}')
      .param('provider', provider)
      .get();
  }

  loginWithEmail(data: {username: string, password: string}): Promise<any>
  {
    return this.http
      .path('/client/login')
      .data(data)
      .post();
  }

  registerWithEmail(data: {first_name: string, last_name: string, email: string, password: string, phone?: string}): Promise<any>
  {
    return this.http
      .path('/clients')
      .data(data)
      .post();
  }

  sendForgotPasswordLink(data: {email: string}): Promise<any>
  {
    return this.http
      .path('/clients/forgot-password')
      .data(data)
      .post();
  }

  resetPassword(data: {email: string, password: string}, signature: string, expires: string): Promise<any>
  {
    return this.http
      .path('/clients/reset-password')
      .data(data)
      .query('signature', signature)
      .query('expires', expires)
      .post();
  }

  logout(): Promise<any>
  {
    return this.http
      .path('/logout')
      .delete();
  }

  getBooking(id: string, companyId: string): Promise<any>
  {
    return this.http
      .path('/bookings/{id}')
      .withCompany(companyId)
      .param('id', id)
      .get();
  }

  createBooking(data: {client_id: string, time_slot_id: number, service_definition_ids: string[]}, companyId: string): Promise<any>
  {
    return this.http
      .path('/bookings')
      .withCompany(companyId)
      .data(data)
      .post();
  }
}
