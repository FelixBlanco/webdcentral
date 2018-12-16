import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
// import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tokenHelper = new JwtHelperService();

  isLoged = localStorage.getItem('access_token'); // variable para mostrar login
  constructor(){
    if(this.tokenHelper.isTokenExpired(this.isLoged)){
      localStorage.clear();
      this.isLoged = null;
      return;
    }

  }
}
