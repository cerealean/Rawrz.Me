import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../models/user';
import { Http } from "@angular/http";
import { environment } from "environments/environment";
import { Login } from "app/models/login";
import { Observable } from "rxjs/Observable";
import * as map from "rxjs/add/operator/map";

@Injectable()
export class LoginService {
  private readonly loginServiceEndpoint: string = environment.serviceEndpoint + "/Login";

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http
  ) { }

  login(username: string, password: string): Observable<User>{
    try {
      console.log("rawr");
      const loginModel: Login = { Username: username, Password: password };
      const request = this.http
        .post(this.loginServiceEndpoint, loginModel)
        .map(request => request.json());
      request.subscribe(user =>
        this.authenticationService.setCurrentlyLoggedInUser(user)
      );

      return request;
    }
    catch(error){
      console.error(error);
    }
        // const currentDate = new Date().valueOf();
    // const encryptedUsername = CryptoJS.AES.encrypt(username, currentDate.toString());
    // const encryptedPassword = CryptoJS.AES.encrypt(password, currentDate.toString());
    // //send to other service;

    // const testUsername = "rawrlicious";
    // const testPassword = "rawrlicious";

    // const isValidPassword = username == testUsername && password == testPassword;

    // if(isValidPassword){
    //   this.setLocalUserInformation();
    // }

    // return this.authenticationService.getCurrentlyLoggedInUser();
  }

  logout(){
    this.authenticationService.clearCurrentlyLoggedInUser();
  }

  private setLocalUserInformation(){
    const currentDate = new Date();
    const fakeUserResponse = new User();
    fakeUserResponse.Id = 55;
    fakeUserResponse.FirstName = "Wendy";
    fakeUserResponse.LastName = "Crawford";
    fakeUserResponse.Email = "wendy.crawford@fakemail.com";
    fakeUserResponse.Phone = "5739794671";
    fakeUserResponse.Authentication = {
      token: "myToken",
      loggedIn: currentDate,
      expires: new Date(currentDate.setHours(currentDate.getHours() + 3))
    };
    this.authenticationService.setCurrentlyLoggedInUser(fakeUserResponse);
  }

}
