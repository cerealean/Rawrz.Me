import { Component, OnInit } from '@angular/core';
import { DateRange } from "app/models/date-range";
import * as moment from "moment";

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public dateRange: DateRange = {
    beginDate: moment().startOf("day").toDate(),
    endDate: moment().add(1, "week").endOf("day").toDate()
  };

  constructor() { }

  ngOnInit() {
    console.log(this.dateRange);
  }

}
