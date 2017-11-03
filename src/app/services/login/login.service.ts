import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../../models/user';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Login } from 'app/models/login';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MsalLoginService } from 'app/services/login/msal.login.service';

@Injectable()
export class LoginService {
  private readonly loginServiceEndpoint: string = environment.serviceEndpoint + '/Login';
  private readonly logoutServiceEndpoint: string = environment.serviceEndpoint + '/Logout';

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http,
    private msalService: MsalLoginService
  ) { }

  login(username: string, password: string): Observable<User>{
    try {
      this.msalService.login();
      // const loginModel: Login = { Username: username, Password: password };
      // const request = this.http
      //   .post(this.loginServiceEndpoint, loginModel)
      //   .map(request => request.json());
      // request.subscribe(user => {
      //   console.log(user);
      //   this.authenticationService.setCurrentlyLoggedInUser(user)
      // });

      // return request;
    }
    catch(error){
      console.error(error);
    }
  }

  logout():Observable<any>{
    try {
      const user = this.authenticationService.getCurrentlyLoggedInUser();
      console.log("made request to logout");

      const request = this.http
        .post(this.loginServiceEndpoint, user);
      request.subscribe(() => {
        console.log("request came back from logging out");
        this.authenticationService.clearCurrentlyLoggedInUser();
      });

      return request;
    } catch (error) {
      console.error(error);
    }
  }

}
