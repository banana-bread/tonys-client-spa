import { Deserializable } from "./deserializable.model";

export class Client implements Deserializable {
  // TODO: implement like this https://nehalist.io/working-with-models-in-angular/
  id: string;
  name: string;
  email: string;

  constructor() {}

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}