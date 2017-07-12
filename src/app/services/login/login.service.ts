import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../models/user';
import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { Login } from "app/models/login";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {
  private readonly loginServiceEndpoint: string = environment.serviceEndpoint + "/Login";
  private readonly logoutServiceEndpoint: string = environment.serviceEndpoint + "/Logout";

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) { }

  login(username: string, password: string): Observable<User>{
    try {
      const loginModel: Login = { Username: username, Password: password };
      const request = this.http
        .post(this.loginServiceEndpoint, loginModel)
        .map(request => request.json());
      request.subscribe(user => {
        console.log(user);
        this.authenticationService.setCurrentlyLoggedInUser(user)
      });

      return request;
    }
    catch(error){
      console.error(error);
    }
  }

  logout(){
    try {
      const user = this.authenticationService.getCurrentlyLoggedInUser();

      const request = this.http
        .post(this.loginServiceEndpoint, user)
        .map(request => request.json());
      request.subscribe(() => {
        this.authenticationService.clearCurrentlyLoggedInUser();
      });

      return request;
    } catch (error) {
      console.error(error);
    }
  }

}
