import { Deserializable } from "./deserializable.model";
export class Employee implements Deserializable{
    id: string;
    name: string;
    email: string;

    constructor() {
        this.id = '';
        this.name = ''
        this.email = ''
    }
    
    deserialize(data: any): this {
        Object.assign(this, data);
        return this;
    }
}