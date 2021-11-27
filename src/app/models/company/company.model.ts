import { BaseModel } from "../base.model";

export class Company extends BaseModel {

    id?: string = null;
    name?: string = null;
    city?: string = null;
    region? = null;
    postal_code?: string = null;
    address?: string = null;
    country?: string = null;
    phone?: string = null;
    time_slot_duration?: number = null;
    booking_grace_period?: number = null;
    settings?: any = null;
    base_schedule?: any = null;

    dates = {}

  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }

  get full_address(): string
  {
    return `${this.address.replace('.', '')}, ${this.city} ${this.region}, ${this.postal_code.substring(0, 3)} ${this.postal_code.substring(3, 6)}`;
  }
}
