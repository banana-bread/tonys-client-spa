import { BaseModel } from "../base.model";

export class Employee extends BaseModel {

    id?: string = null;
    company_id?: string = null;
    first_name?: string = null;
    last_name?: string = null;
    email?: string = null;

    dates = {}

    constructor(data: any = {}) 
    {
        super();
        this.map(data);
    }
    
    get initials(): string
    {
        return `${this.first_name[0]?.toUpperCase()}${this.last_name[0]?.toUpperCase()}`;
    }
}