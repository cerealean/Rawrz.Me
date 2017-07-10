import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from "app/components/nav-bar/nav-bar.component";
import { AppFooterComponent } from "app/components/app-footer/app-footer.component";
import { HomeComponent } from "app/components/home/home.component";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { LoginService } from "app/services/login/login.service";
import { AppRoutingModule } from "app/app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppFooterComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
