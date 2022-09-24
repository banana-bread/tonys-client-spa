import { Injectable } from '@angular/core';
import { HttpAdapter } from '@tonys-barbers/shared';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpAdapter,
    private state: AppStateService,
  ) { }

  /////// new dynamic methods /////////
  // get(resource: string, id: string|number, withCompany: boolean): Promise<any>
  // {
  //   let request = this.http
  //     .path(`/${resource}/${id}`)
    
  //   if (withCompany)
  //   {
  //     request = request.withCompany(this.state.company.id)
  //   }

  //   return request.get()
  // }
  //////// old methods, still in use /////////

  getEmployee(id: string): Promise<any>
  {
    return this.http
      .path('/employees/{id}')
      .param('id', id)
      .withCompany(this.state.company.id)
      .get()
  }

  getAuthedClient(): Promise<any> 
  {
    return this.http
      .path('/client/authed')
      .get();
  }

  getClientBookings(id: string, dateFrom: string, dateTo: string): Promise<any>
  {
    return this.http
      .path('/clients/{id}/bookings')
      .param('id', id)
      .query('date-from', dateFrom)
      .query('date-to', dateTo)
      .get();
  }

  // TODO: remove, push to BaseModel, change -'s with _'s
  getAllTimeSlots(serviceIds: string[], dateFrom: string, dateTo: string, employeeId: string = '', companyId: string): Promise<any> 
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
      .get()
  }

  getCompanyBySlug(slug: string): Promise<any>
  {
    return this.http  
      .path('/locations/slug/{slug}')
      .param('slug', slug)
      .get();
  }

  // This technically logins in and/or registers... find a better name?
  loginWithProvider(provider: string): Promise<any> 
  {
    return this.http
      .path('/client/login/{provider}')
      .param('provider', provider)
      .post();
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
      .path('/users/forgot-password')
      .data(data)
      .post();
  }

  resetPassword(data: {email: string, password: string}, signature: string, expires: string): Promise<any>
  {
    return this.http
      .path('/users/reset-password')
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

  createBooking(data: {client_id: string, time_slot_id: number, service_definition_ids: string[], note: string}, companyId: string): Promise<any>
  {
    return this.http
      .path('/bookings')
      .withCompany(companyId)
      .data(data)
      .post();
  }

  cancelBooking(id: string): Promise<any>
  {
    return this.http
      .path('/bookings/{id}')
      .param('id', id)
      .delete();
  }

  verifyRecaptcha(data: {token: string})
  {
    return this.http
      .path('/verify-recaptcha')
      .data(data)
      .post();
  }

  refreshToken(data: { refresh_token: string }): Promise<any>
  {
    return this.http
      .path('/refresh-token')
      .data(data)
      .post();
  }
}
