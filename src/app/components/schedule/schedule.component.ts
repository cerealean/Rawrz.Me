import { Component, OnInit } from '@angular/core';
import { DateRange } from "app/models/date-range";
import * as moment from "moment";
import { ScheduledUser } from "app/models/scheduled-user";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { Role } from "app/models/role";
import { ScheduleService } from "app/services/schedule/schedule.service";

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  public dateRange: DateRange;
  public daysInRange: Date[];
  public scheduledUsers: ScheduledUser[] = [];
  public roles: Role[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private scheduleService: ScheduleService
  ) {
    let beginDate = moment().startOf("day").toDate();
    let endDate = moment().add(1, "week").endOf("day").toDate();
    this.dateRange = new DateRange(beginDate, endDate);
  }

  ngOnInit() {
    this.daysInRange = this.dateRange.getRange();
    this.roles = this.scheduleService.getRoles();
    console.log(this.dateRange.getRange());
    this.daysInRange.map(day => {
      this.scheduledUsers.push(
        {
          scheduledOn: day,
          role: this.roles[this.randomIntFromInterval(0, this.roles.length - 1)],
          user: this.authenticationService.getCurrentlyLoggedInUser()
        },
        {
          scheduledOn: day,
          role: this.roles[this.randomIntFromInterval(0, this.roles.length - 1)],
          user: this.authenticationService.getCurrentlyLoggedInUser()
        },
        {
          scheduledOn: day,
          role: this.roles[this.randomIntFromInterval(0, this.roles.length - 1)],
          user: this.authenticationService.getCurrentlyLoggedInUser()
        },
        {
          scheduledOn: day,
          role: this.roles[this.randomIntFromInterval(0, this.roles.length - 1)],
          user: this.authenticationService.getCurrentlyLoggedInUser()
        },
      );
    });
  }

  private randomIntFromInterval(min:number, max:number)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

}
