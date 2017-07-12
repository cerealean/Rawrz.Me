import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class MemberGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean 
  {
    const isLoggedIn = this.authenticationService.isUserLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/home']);
    }

    return isLoggedIn;
  }
}
