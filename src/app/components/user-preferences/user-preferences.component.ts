import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { Email } from "app/models/email";
import { Phone } from "app/models/phone";
import { PhoneType } from "app/enums/phone-type";

@Component({
  templateUrl: "./user-preferences.component.html",
  styleUrls: ["./user-preferences.component.scss"]
})
export class UserPreferencesComponent implements OnInit {
  public user: User;
  public isSaving: boolean = false;
  public phoneTypeKeys: string[] = this.getPhoneTypes();
  public phoneType = PhoneType;
  public showChangePasswordModal = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    if (this.authenticationService.isUserLoggedIn()) {
      this.user = this.authenticationService.getCurrentlyLoggedInUser();
    }
  }

  save() {
    this.isSaving = true;
    this.authenticationService.setCurrentlyLoggedInUser(this.user);
    setTimeout(() => (this.isSaving = false), 2000);
  }

  addNewEmail() {
    this.user.EmailAddresses.push(new Email());
  }

  markNonSelectedEmailsAsNotPrimary(userEmails: Email[], selectedEmail: Email) {
    userEmails
      .filter(email => email != selectedEmail)
      .map(email => (email.IsPrimary = false));
  }

  deleteEmail(email: Email) {
    if (email.IsPrimary === false) {
      const index = this.user.EmailAddresses.indexOf(email);
      this.user.EmailAddresses.splice(index, 1);
    }
  }

  addNewPhone() {
    this.user.PhoneNumbers.push(new Phone());
  }

  markNonSelectedPhonesAsNotPrimary(userPhones: Phone[], selectedPhone: Phone) {
    userPhones
      .filter(phone => phone != selectedPhone)
      .map(phone => (phone.IsPrimary = false));
  }

  deletePhone(phone: Phone) {
    if (phone.IsPrimary === false) {
      const index = this.user.PhoneNumbers.indexOf(phone);
      this.user.PhoneNumbers.splice(index, 1);
    }
  }

  preventIfPrimary(event: KeyboardEvent, contact: Phone | Email) {
    if (contact.IsPrimary) {
      event.preventDefault();
    }
  }

  canTextUser() : boolean {
    return this.user.PhoneNumbers.find(phone => phone.PhoneType === PhoneType.Mobile && phone.CanText) !== undefined;
  }

  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
  }

  private getPhoneTypes(): string[] {
    return Object.keys(PhoneType).filter(key => !isNaN(Number(key)));
  }
}
