import { Deserializable } from "./deserializable.model";

export class ServiceDefinition implements Deserializable {
    id: string;
    name: string;
    price: number;
    duration: number;
    selected: boolean;

    constructor() {
        this.id = '';
        this.name = '';
        this.price = 0;
        this.duration = 0;
        this.selected = false;
    }
    deserialize(data: any): this {
        Object.assign(this, data);
        return this;
    }
}