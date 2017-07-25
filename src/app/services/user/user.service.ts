import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { User } from "app/models/user";
import { environment } from "environments/environment";

@Injectable()
export class UserService {
  private readonly userServiceEndpoint: string = environment.serviceEndpoint + "/User";
  constructor(private http: Http) {}

  public createUser(user: User) {
    return this.http.post(this.userServiceEndpoint, user);
  }
}
