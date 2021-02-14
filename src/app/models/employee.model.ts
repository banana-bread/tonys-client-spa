import { Deserializable } from "./deserializable.model";
// import { TimeSlot } from "./time-slot.model";

export class Employee implements Deserializable{
    id: string;
    name: string;
    email: string;

    // time_slots: TimeSlot[];

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