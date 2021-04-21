import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(data: {username: string, password: string}) 
  {
    return this.http.post('http://localhost:89/login', data);
  }

  register(data: {name: string, email: string, password: string}) 
  {
    return this.http.post('http://localhost:89/register/client', data)
  }
}
