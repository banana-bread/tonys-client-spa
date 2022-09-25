import { BaseModel } from "./base.model";
import { Company } from "./company.model";

export class Employee extends BaseModel {

    id?: string = null;
    company_id?: string = null;
    first_name?: string = null;
    last_name?: string = null;
    email?: string = null;
    ordinal_position?: number = 0;

    company: Company = null;

    dates = {};
    relations = {
        company: Company,
    };

    constructor(data: any = {}) 
    {
        super()
        this.map(data)
    }

    static async find(id: string): Promise<Employee>
    {
      const response = await this.api.getEmployee(id)
  
      return new Employee(response.data.employee)
    }    
    
    get initials(): string
    {
        return `${this.first_name[0]?.toUpperCase()}${this.last_name[0]?.toUpperCase()}`;
    }
}
