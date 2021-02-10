import { TimeSlot } from "./time-slot.model";

export class Employee {
    id: string;
    name: string;
    email: string;

    time_slots: TimeSlot[];

    constructor() {
        
    }
}