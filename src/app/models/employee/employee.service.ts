import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private api: ApiService) {}

  async get(id: string, companyId: string): Promise<Employee>
  {
    const response = await this.api.getEmployee(id, companyId);
    return new Employee(response.data.employee);
  }

  async getAll(companyId: string): Promise<Employee[]> 
  {
    const response = await this.api.getEmployees(companyId);
    
    return response.data.employees
      .map((employee: any) => new Employee(employee));
  }
}