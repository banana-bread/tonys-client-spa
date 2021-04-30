import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TokenData } from './token-data.interface';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(data: TokenData): void 
  {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('expires_at', this.setExpiresAt(data.expires_in));
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('token_type', data.token_type);
  }

  getToken(): string | null 
  {
    return localStorage.getItem('access_token')
  }

  hasToken(): boolean 
  {
    return !!this.getToken();
  }

  hasValidToken(): boolean
  {
    return moment().add(5, 'minutes').isSameOrBefore(moment.unix(this.getExpiresAt()))
  }

  getExpiresAt(): number | null 
  {
    return parseInt(localStorage.getItem('expires_at'));
  }

  hasExpiresAt(): boolean
  {
    return !!this.getExpiresAt();
  }

  getRefreshToken(): string | null 
  {
    return localStorage.getItem('refresh_token')
  }

  hasRefreshToken(): boolean
  {
    return !!this.getRefreshToken();
  }

  removeToken(): void 
  {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
  }

  private setExpiresAt(expires_in: number): string 
  {
    return moment().add(expires_in, 'seconds').unix().toString();
  }  
}
