import { Dictionary, groupBy } from "lodash";
import * as moment from "moment";
import { BaseModel } from "./base.model";

export class TimeSlot extends BaseModel {

    id?: number = null;
    company_id?: string = null;
    employee_id?: string = null;
    start_time?: Date = null;
    end_time?: Date = null;

    dates = {
      start_time: null,
      end_time: null,
    };

    relations = {};

    constructor(data: any = {}) 
    {
      super();
      this.map(data);
    }

    static async all(params): Promise<any>
    {
      const response = await this.api.getAllTimeSlots(
        params.services.map(service => service.id),
        params.dateFrom,
        params.dateTo,
        params.employee.id,
        params.company.id
      );

      return response.data.time_slots.map(slot => new TimeSlot(slot))
    }

    // TODO: remove? pretty sure unused
    static group(slots: TimeSlot[]): Dictionary<TimeSlot[]>
    {
      return groupBy(slots, slot => {
        return moment(slot.start_time).startOf('day').format('l');
      })
    }
}