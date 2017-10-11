import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
declare var Msal:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    this.login();
  }
  public applicationName = environment.applicationName;

  access_token: string;
  
  tenantConfig = {
      tenant: "RawrzTest.onmicrosoft.com",
      clientID: 'e05a8c5c-6999-4ef4-bf15-a9f4ddb8a37e',
      signUpSignInPolicy: "B2C_1_Default",
      b2cScopes: ["https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read"]
  };
  
  // Configure the authority for Azure AD B2C

  authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant + "/" + this.tenantConfig.signUpSignInPolicy;

  /*
    * B2C SignIn SignUp Policy Configuration
    */
  clientApplication = new Msal.UserAgentApplication(
      this.tenantConfig.clientID, this.authority, 
      function (errorDesc: any, token: any, error: any, tokenType: any) {
        console.log("Error desk", errorDesc);
        console.log("Token", token);
        console.log("Error ", error);
        console.log("Token type", tokenType);

          // Called after loginRedirect or acquireTokenPopup
      }
  );

  public login(): void {
      var _this = this;
      this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken: any) {
          _this.clientApplication.acquireTokenSilent(_this.tenantConfig.b2cScopes).then(
              function (accessToken: any) {
                  _this.access_token = accessToken;
                  console.log(this.access_token);
              }, function (error: any) {
                  _this.clientApplication.acquireTokenPopup(_this.tenantConfig.b2cScopes).then(
                      function (accessToken: any) {
                          _this.access_token = accessToken;
                          console.log(this.access_token);
                      }, function (error: any) {
                          console.error("Error acquiring the popup:\n" + error);
                      });
              })
      }, function (error: any) {
          console.error("Error during login:\n" + error);
      });
  }

}
