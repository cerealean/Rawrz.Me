import { Component, OnInit } from '@angular/core';
import { DateRange } from "app/models/date-range";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public dateRange:DateRange;

  constructor() { }

  ngOnInit() {
  }

}
