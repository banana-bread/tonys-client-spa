import { Employee } from './employee.model';

export class TimeSlot {
    id: string;
    reserved: boolean;
    start_time: Date;
    end_time: Date;

    employee: Employee
}