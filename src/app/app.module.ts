import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "app/app-routing.module";
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from "app/components/nav-bar/nav-bar.component";
import { AppFooterComponent } from "app/components/app-footer/app-footer.component";
import { HomeComponent } from "app/components/home/home.component";
import { AuthenticationService } from "app/services/authentication/authentication.service";
import { LoginService } from "app/services/login/login.service";
import { UserPreferencesComponent } from "app/components/user-preferences/user-preferences.component";
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleService } from "app/services/schedule/schedule.service";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AppFooterComponent,
    NavBarComponent,
    UserPreferencesComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpModule
  ],
  providers: [
    LoginService,
    AuthenticationService,
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
