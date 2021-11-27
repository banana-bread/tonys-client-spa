import { BaseModel } from "../base.model";

export class Booking extends BaseModel {
  
  id? = '';
  client_id? = '';
  employee_id? = '';
  cancelled_at?: number = null;
  cancelled_by?: string = null;
  started_at?: Date = null;
  ended_at?: Date = null;

  dates = {
    started_at: null,
    ended_at: null,
  }

  relations = {};

  // TODO: figure out how to make this reusable
  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }
}