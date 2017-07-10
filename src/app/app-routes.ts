import { Routes }  from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberGuard } from './guards/member.guard';

export const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  }
];