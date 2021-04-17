import * as moment from 'moment';

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