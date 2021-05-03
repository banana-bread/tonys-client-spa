import { Dictionary, groupBy } from "lodash";
import * as moment from "moment";
import { Deserializable } from "./deserializable.model";

export class TimeSlot implements Deserializable {
    id: number = null;
    company_id: string = null;
    employee_id: string = null;
    start_time: Date = null;
    end_time: Date = null;

    constructor() {}

    deserialize(data: any): this 
    {
      Object.assign(this, data)
      return this;
    }
    
    static group(slots: TimeSlot[]): Dictionary<TimeSlot[]>
    {
      return groupBy(slots, slot => {
        return moment(slot.start_time).startOf('day').format('l');
      })
    }


}