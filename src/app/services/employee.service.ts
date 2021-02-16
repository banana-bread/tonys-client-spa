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

  getEmployees(): Observable<Employee> {
    return this.api.getEmployees()
      .pipe(map((response: any) => response.data.employees
        .map((employee: any) => new Employee().deserialize(employee)))
      )
  }
}