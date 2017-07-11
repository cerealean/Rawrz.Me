import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public showNavigation:boolean = true;
  public showLoginModal = false;
  public isLoggingOut:boolean = false;
  public user:User = null;
  public applicationName:string = environment.applicationName;

  constructor(
    private authenticationService:AuthenticationService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.user = this.authenticationService.getCurrentlyLoggedInUser();
    }
  }

  getCurrentRoute():string{
    return this.route.toString();
  }

  triggerLoginModal(){
    this.showLoginModal = true;
  }

  setUser(user:User){
    this.user = user;
  }

  toggleNavigationVisability(navIcon:HTMLElement, navigation:HTMLElement){
    this.showNavigation = !this.showNavigation;
    const navigationHeight = navigation.offsetHeight;
    navIcon.setAttribute("top", navigationHeight.toString());
  }

  logout(){
    this.isLoggingOut = true;
    this.authenticationService.clearCurrentlyLoggedInUser();
    this.user = null;
    setTimeout(() => {
      this.isLoggingOut = false;
      this.router.navigateByUrl("/home");
    }, 3000);
  }
}
