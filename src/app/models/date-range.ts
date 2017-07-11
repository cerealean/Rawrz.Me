import * as moment from 'moment';

export class DateRange {
    public beginDate: Date;
    public endDate: Date;

    constructor(beginDate: Date, endDate: Date) {
        this.beginDate = beginDate;
        this.endDate = endDate;
    }

    public getRange(): Date[] {
        if (!this.beginDate || !this.endDate) {
            throw new Error("beginDate and endDate cannot be null!");
        }

        let iteratingDate = moment(this.beginDate);
        const endDateMoment = moment(this.endDate);
        let dates: Date[] = [];

        while (iteratingDate < endDateMoment) {
            dates.push(iteratingDate.toDate());
            iteratingDate = iteratingDate.add(1, "day");
        }

        return dates;
    }
}