import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { environment } from '../../../environments/environment';
import { LoginService } from "app/services/login/login.service";

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
    private authenticationService: AuthenticationService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.user = this.authenticationService.getCurrentlyLoggedInUser();
    }
    document.addEventListener('DOMContentLoaded', function () {
      
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
      
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
      
          // Add a click event on each of them
          $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
      
              // Get the target from the "data-target" attribute
              var target = $el.dataset.target;
              var $target = document.getElementById(target);
      
              // Toggle the class on both the "navbar-burger" and the "navbar-menu"
              $el.classList.toggle('is-active');
              $target.classList.toggle('is-active');
      
            });
          });
        }
      
      });
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
    this.user = null;
    this.loginService
      .logout()
      .subscribe(() => {
        this.isLoggingOut = false;
      });
  }
}
