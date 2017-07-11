import { Component, OnInit } from '@angular/core';
import { DateRange } from "app/models/date-range";
import * as moment from "moment";
import { ScheduledUser } from "app/models/scheduled-user";

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public dateRange: DateRange;
  public daysInRange: Date[];
  public scheduledUsers: ScheduledUser[];

  constructor() {
    let beginDate = moment().startOf("day").toDate();
    let endDate = moment().add(1, "week").endOf("day").toDate();
    this.dateRange = new DateRange(beginDate, endDate);
  }

  ngOnInit() {
    this.daysInRange = this.dateRange.getRange();
    console.log(this.dateRange.getRange());
  }

}
