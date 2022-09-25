import * as moment from "moment";
import { BaseModel } from "./base.model";
import { Client } from "./client.model";
import { Employee } from "./employee.model";
import { Note } from "./note.model";
import { Service } from "./service.model";

export class Booking extends BaseModel {
  // TODO: figure out how to make this reusable
  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }

  id?: string = null
  client_id?: string = null
  employee_id?: string = null
  time_slot_id?: number = null
  cancelled_at?: number = null
  cancelled_by?: string = null
  started_at?: Date = null
  ended_at?: Date = null

  employee: Employee = new Employee()
  client: Client = new Client()
  services: Service[] = []
  note: Note = new Note()

  dates = {
    started_at: null,
    ended_at: null,
  }

  relations = {
    employee: Employee,   
    client: Client,
    services: Service,
    note: Note,
  }

  async cancel(): Promise<void>
  {
    await Booking.api.cancelBooking(this.id)
  }

  async save(): Promise<void>
  {
    this.strip()
    await Booking.api.createBooking(this)
  }

  isInFuture(): boolean
  {
    return moment(moment()).isBefore(this.started_at);
  }

  isCancelled(): boolean
  {
    return !!this.cancelled_at;
  }

  canBeCancelled(): boolean
  {
    return !this.isCancelled() && this.isInFuture();
  }

  get duration(): number
  {
    return this.services.reduce((previous, current) => {
      return current.duration + previous;
    }, 0)
  }

  get total_price(): number 
  {
    return this.services.reduce((previous, current) => {
      return current.price + previous
    }, 0)
  }

  get status(): string
  {
      return this.cancelled_at    
          ? 'cancelled'
          : 'scheduled'
  }
}
