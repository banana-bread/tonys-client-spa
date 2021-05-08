import { BaseModel } from "../base.model";

export class Booking extends BaseModel {
  
  id? = '';
  client_id? = '';
  employee_id? = '';
  cancelled_at?: number = null;
  cancelled_by?: string = null;
  started_at?: number = null;
  ended_at?: number = null;

  // TODO: figure out how to make this reusable
  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }
}