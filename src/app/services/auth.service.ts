import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from '@tonys-barbers/shared';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
  TODO:
    - Fix login with providers
  */

  constructor(
    private api: ApiService,
    private jwt: JwtService,
  ) { }

  async loginWithEmail(username: string, password: string): Promise<void> 
  {
    const response = await this.api.loginWithEmail({username, password});
    this.jwt.setToken(response.data);
  }

  // async loginWithProvider(provider: string): Promise<void>
  // {
  //   const response = await this.api.loginWithProvider(provider);


  // }

  async registerWithEmail(first_name: string, last_name: string, email: string, password: string, phone?: string): Promise<any> 
  {
    return await this.api.registerWithEmail({first_name, last_name, email, password, phone});
  }

  
  async logout(): Promise<void>
  {
    await this.api.logout();

    this.jwt.removeToken();
  }

  isLoggedIn(): boolean
  {
    return this.jwt.hasToken() && this.jwt.hasValidToken();
  }

  async attemptRefresh(): Promise<void|boolean>
  {
    try
    {
      const response = await this.api.refreshToken({refresh_token: this.jwt.getRefreshToken()});
      this.jwt.setToken(response.data)
    }
    catch
    {
      return false;
    }
  }
}
