import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { ApiService } from '../network/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private jwtService: JwtService,
  ) { }

  async loginWithEmail(username: string, password: string): Promise<void> 
  {
    const response = await this.api.loginWithEmail({username, password});
    this.jwtService.setToken(response.data);
  }

  async loginWithProvider(provider: string): Promise<void>
  {
    const response = await this.api.loginWithProvider(provider);
    // TODO: do something with the response...
  }

  async registerWithEmail(name: string, email: string, password: string): Promise<any> 
  {
    const response = await this.api.registerWithEmail({name, email, password});
    return response;
  }
}
