import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { NewUser } from "app/models/newUser";

@Injectable()
export class UserService {
  private readonly userServiceEndpoint: string = environment.serviceEndpoint + "/User";
  constructor(private http: Http) {}

  public createUser(newUser: NewUser) : Promise<any> {
    return this.http
      .post(this.userServiceEndpoint, newUser)
      .map(response => response.json())
      .toPromise();
  }
}
