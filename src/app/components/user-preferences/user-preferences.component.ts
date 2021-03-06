import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { Email } from "app/models/email";

@Component({
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit {
  public user: User;
  public isSaving: boolean = false;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.user = this.authenticationService.getCurrentlyLoggedInUser();
    }
  }

  addNewEmail() {
    this.user.EmailAddresses.push(new Email());
  }

  save() {
    this.isSaving = true;
    this.authenticationService.setCurrentlyLoggedInUser(this.user);
    setTimeout(() => this.isSaving = false, 2000);
  }

}
