import { BaseModel } from "./base.model";

export class Service extends BaseModel {

    id?: string = '';
    name?: string = '';
    description?: string = '';
    price?: number = 0;
    duration?: number = 0;

    dates = {};
    relations = {};

    constructor(data: any = {}) 
    {
        super();
        this.map(data);
    }
}
