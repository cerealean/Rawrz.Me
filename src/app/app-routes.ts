import { Routes }  from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberGuard } from './guards/member.guard';
import { UserPreferencesComponent } from "app/components/user-preferences/user-preferences.component";
import { ScheduleComponent } from "app/components/schedule/schedule.component";

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "user-preferences",
    component: UserPreferencesComponent,
    canActivate: [MemberGuard]
  },
  {
    path: "schedule",
    component: ScheduleComponent,
    canActivate: [MemberGuard]
  }
];