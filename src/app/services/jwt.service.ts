import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(data: {access_token: string, expires_in: number, refresh_token: string, token_type: 'Bearer'}): void {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expires_at', this.setExpiresAt(data.expires_in));
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('token_type', data.token_type);
  }

  getToken(): string {
    return localStorage.getItem('access_token')
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  removeToken(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
  }

  private setExpiresAt(expires_in: number): string {
    return String(moment().add(expires_in, 'seconds').unix());
  }  
}
