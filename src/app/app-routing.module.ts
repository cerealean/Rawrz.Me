import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { appRoutes } from './app-routes';
import { MemberGuard } from "app/guards/member.guard";

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [MemberGuard]
})
export class AppRoutingModule {}