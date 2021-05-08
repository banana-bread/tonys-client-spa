import { BaseModel } from "./base.model";

export class Client extends BaseModel {

  id?: string = '';
  name?: string = '';
  email?: string = '';

  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }
}
