import * as moment from "moment";
import { BaseModel } from "../base.model";
import { Employee } from "../employee.model";
import { Service } from "../service/service.model";

export class Booking extends BaseModel {
  // TODO: figure out how to make this reusable
  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }

  id? = '';
  client_id? = '';
  employee_id? = '';
  cancelled_at?: number = null;
  cancelled_by?: string = null;
  started_at?: Date = null;
  ended_at?: Date = null;

  employee: Employee = null;
  services: Service[] = [];

  dates = {
    started_at: null,
    ended_at: null,
  }

  relations = {
    employee: Employee,   
    services: Service,
  };

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
