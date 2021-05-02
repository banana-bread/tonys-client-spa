import { Deserializable } from "./deserializable.model";

export class Booking implements Deserializable {
  id = '';
  client_id = '';
  employee_id = '';
  cancelled_at: number = null;
  cancelled_by: string = null;
  started_at: number = null;
  ended_at: number = null;

  constructor() {}

  deserialize(data: any): this 
  {
    Object.assign(this, data.booking);
    return this;
  }
}