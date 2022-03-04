import { BaseModel } from "../base.model";

export class Client extends BaseModel {

  id?: string = null;
  first_name?: string = null;
  last_name?: string = null;
  email?: string = null;
  phone?: string = null;

  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }

  dates = {}
  relations = {};

  get full_name(): string
  {
    return `${this.first_name} ${this.last_name}`
  }
}
