import { Deserializable } from "./deserializable.model";

export class Client implements Deserializable {
  id: string;
  name: string;
  email: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
  }

  deserialize(data: any): this {
    Object.assign(this, data.client);
    return this;
  }
}