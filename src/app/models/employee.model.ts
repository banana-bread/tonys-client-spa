import { Deserializable } from "./deserializable.model";
import { ServiceDefinition } from "./service-definition.model";
export class Employee implements Deserializable{
    id: string = '';
    company_id: string = '';
    name: string = '';
    email: string = '';

    constructor() {}
    
    deserialize(data: any): this 
    {
        Object.assign(this, data);
        return this;
    }

    get initials(): string
    {
        return this.name[0].toUpperCase();
    }
}