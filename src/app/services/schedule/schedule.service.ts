import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Role } from "app/models/role";

@Injectable()
export class ScheduleService {

  constructor(private http: Http) { }
  
  public getRoles():Role[] {
    return [
      {
        id: 1,
        name: "Manager"
      },
      {
        id: 2,
        name: "Server"
      },
      {
        id: 3,
        name: "Host"
      }
    ];
  }

}
