import { Dictionary, groupBy } from "lodash";
import * as moment from "moment";
import { BaseModel } from "../base.model";

export class TimeSlot extends BaseModel {

    id?: number = null;
    company_id?: string = null;
    employee_id?: string = null;
    start_time?: Date = null;
    end_time?: Date = null;

    constructor(data: any = {}) 
    {
      super();
      this.map(data);
    }
    
    static group(slots: TimeSlot[]): Dictionary<TimeSlot[]>
    {
      return groupBy(slots, slot => {
        return moment(slot.start_time).startOf('day').format('l');
      })
    }


}