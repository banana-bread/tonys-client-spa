import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  login(username: string, password: string) 
  {
    return this.http.post('http://localhost:89/login', {username, password})
      .subscribe(
        (response: any) => this.jwtService.setToken(response.data),
        (error: any) => console.error(error)// TODO: handle error
      )
  }

  register(name: string, email: string, password: string) 
  {
    return this.http.post('http://localhost:89/register/client', {name, email, password})
      .subscribe(
        (response: any) => console.log(response), // TODO: handle
        (error: any) => console.error(error) // TODO:handle
      )
  }
}
