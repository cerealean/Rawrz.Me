import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
// import {Msal} from 'msal/dist/msal'

// var rawr = new Msal();

declare var Msal: any;

@Injectable()
export class MsalLoginService {
    public applicationName = environment.applicationName;

    constructor(
        private httpClient: HttpClient
    ) { }

    access_token: string;
    tenantConfig = {
        tenant: "RawrzTest.onmicrosoft.com",
        clientID: 'e05a8c5c-6999-4ef4-bf15-a9f4ddb8a37e',
        signUpSignInPolicy: "B2C_1_Default",
        signUpPolicy: "B2C_1_DefaultSignUp",
        signInPolicy: "B2C_1_DefaultSignIn",
        b2cScopes: ["https://RawrzTest.onmicrosoft.com/authorize/demo.read"],
        webApi: "https://RawrzTest.onmicrosoft.com/authorize"
    };
    authority = "https://login.microsoftonline.com/tfp/" + this.tenantConfig.tenant;
    clientApplication;

    public login() {
        //Todo: get this to work without opening a new window
        this.clientApplication = this.CreateClientApplication(this.tenantConfig.signInPolicy);
        this.clientApplication.loginPopup(this.tenantConfig.b2cScopes).then(function (idToken) {
            this.clientApplication.acquireTokenSilent(this.tenantConfig.b2cScopes).then(function (accessToken) {
                console.log(idToken, accessToken);
            }, function (error) {
                console.error(error);
                this.clientApplication.acquireTokenPopup(this.tenantConfig.b2cScopes).then(function (accessToken) {
                    console.log("Second time", accessToken);
                }, function (error) {
                    console.error("Error acquiring the popup:\n" + error);
                });
            })
        }, function (error) {
            console.error("Error during login:\n" + error);
        });
        return new Observable<User>();
    }

    public otherMethod(){
        const clientApplication = this.CreateClientApplication(this.tenantConfig.signInPolicy);
        clientApplication.acquireTokenSilent(this.tenantConfig.b2cScopes).then(function (accessToken) {
            console.log("Access token:", accessToken)
            var request = this.httpClient
                .get(this.webApi, {"headers":{"Authorization":"Bearer " + accessToken}})
                .map(request => request.json());
            return request.subscribe(info => console.log(info));
        }, function (error) {
            console.error(error);
            clientApplication.acquireTokenPopup(this.tenantConfig.b2cScopes).then(function (accessToken) {
                var request = this.httpClient
                .get(this.webApi, {"headers":{"Authorization":"Bearer " + accessToken}})
                .map(request => request.json());
                return request.subscribe(info => console.log(info));
            }, function (error) {
                throw Error("Error acquiring the access token to call the Web api:\n" + error);
            });
        });
    }

    private CreateClientApplication(action: string) {
        const clientApplication =  new Msal.UserAgentApplication(
            this.tenantConfig.clientID, this.authority + "/" + action,
            function (errorDesc: any, token: any, error: any, tokenType: any) {
                console.log("Error desk", errorDesc);
                console.log("Token", token);
                console.log("Error ", error);
                console.log("Token type", tokenType);

                // Called after loginRedirect or acquireTokenPopup
            }
        );
        console.log(clientApplication);
        return clientApplication;
    }
}