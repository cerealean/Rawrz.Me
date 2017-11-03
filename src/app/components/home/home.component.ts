import { Component, OnInit } from '@angular/core';
import { MsalLoginService } from 'app/services/login/msal.login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private msalService:MsalLoginService
    ){}

  ngOnInit(): void {
    this.msalService.login();
  }

}
