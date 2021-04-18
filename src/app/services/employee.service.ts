import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './network/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private api: ApiService) {}

  async getEmployees(): Promise<Employee[]> 
  {
    const response = await this.api.getEmployees();
    
    return response.data.employees
      .map(employee => new Employee().deserialize(employee));
  }
}