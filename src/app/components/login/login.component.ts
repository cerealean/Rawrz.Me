import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  @Input() public showLoginModal:boolean = false;
  @Output() public onClose = new EventEmitter<boolean>();
  @Output() public user = new EventEmitter<User>();
  public hasBlurredUsername:boolean = false;
  public hasBlurredPassword:boolean = false;
  public isValidUsername:boolean = false;
  public isValidPassword:boolean = false;
  public isLoggingIn:boolean = false;
  public hasClickedLogin:boolean = false;
  public isValidLogin:boolean = false;

  constructor(private loginService:LoginService) { }

  ngOnInit() {  }

  closeModal(usernameElement:HTMLElement = null, passwordElement:HTMLElement = null){
    if(usernameElement){
      (<HTMLInputElement>usernameElement).value = "";
    }
    if(passwordElement){
      (<HTMLInputElement>passwordElement).value = "";
    }
    this.showLoginModal = false;
    this.onClose.emit(true);
    this.hasBlurredPassword = false;
    this.hasBlurredUsername = false;
    this.isValidUsername = false;
    this.isValidPassword = false;
    this.isValidLogin = false;
    this.hasClickedLogin = false;
    this.isLoggingIn = false;
  }

  login(username:HTMLElement, password:HTMLElement){
    try{
      const usernameValue = (<HTMLInputElement>username).value;
      const passwordValue = (<HTMLInputElement>password).value;
      this.validateUsername(usernameValue);
      this.validatePassword(passwordValue);
      if(this.isValidUsername && this.isValidPassword){
        this.isLoggingIn = true;
        this.hasClickedLogin = true;
        this.loginService
          .login(usernameValue, passwordValue)
          .subscribe(user => {
            console.log(user);
            },
            () => this.isLoggingIn = false,
            () => this.isLoggingIn = false
          );
      }
    }
    catch(exception){
      this.isLoggingIn = false;
    }
  }

  validateUsername(username:string){
    this.hasBlurredUsername = true;
    this.isValidUsername = username.length > 6;
  }

  validatePassword(password:string){
    this.hasBlurredPassword = true;
    this.isValidPassword = password.length > 10;
  }

}
