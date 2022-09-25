import { BaseModel } from "./base.model";

export class Note extends BaseModel {
  // TODO: figure out how to make this reusable
  constructor(data: any = {}) 
  {
    super();
    this.map(data);
  }

  id?: string = null
  noteable_id?: string = null
  noteable_type?: string = null
  body?: string = null

  relations = {}
  dates = {}
}
