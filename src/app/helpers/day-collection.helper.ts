import * as moment from 'moment';
import { TimeSlot } from '../models/time-slot/time-slot.model';

type Moment = moment.Moment;

export class DayCollection {

    private start: Moment;
    private end: Moment;
    private days: Moment[] = [];

    private constructor(start: Moment|Date, end: Moment|Date)
    {
        this.start = moment(start);
        this.end = moment(end);
    }

    static fromDays(start: Moment|Date, end: Moment|Date)
    {
        return new DayCollection(start, end).create();
    }

    static fromSlots(slots: TimeSlot[])
    {
        return new DayCollection(
            slots[0].start_time,
            [...slots].pop().start_time
        ).create();
    }

    create(): Moment[]
    {
        const numberOfDays = this.end.diff(this.start, 'days');

        for (let i = 0; i < numberOfDays; i++)
        {
            this.days.push(
                this.start.clone().add(i, 'days')
            );
        }

        return this.days;
    }
}