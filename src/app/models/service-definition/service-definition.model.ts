import { BaseModel } from "../base.model";

export class ServiceDefinition extends BaseModel {

    id?: string = '';
    name?: string = '';
    price?: number = 0;
    duration?: number = 0;
    selected?: boolean = false;
    ordinal_position?: number = 0;

    dates = {}

    constructor(data: any = {}) 
    {
        super();
        this.map(data);
    }
}