import { Deserializable } from "./deserializable.model";

export class TimeSlot implements Deserializable {
    id: string;
    employee_id: string;
    start_time: Date;
    end_time: Date;

    constructor() {
      this.id = '',
      this.employee_id = '',
      this.start_time = new Date(),
      this.end_time = new Date()
    }

    deserialize(data: any): this {
      Object.assign(this, data)
      return this;

    }
}