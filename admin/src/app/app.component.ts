import { Component } from '@angular/core';
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoged = localStorage.getItem('sesion_login'); // variable para mostrar login
  url = window.location.pathname;
  constructor( private loginS:LoginService){
    // this.loginS._getAuthUser(localStorage.getItem('access_token')).subscribe(
    //   (resp:any) => {
        
    //   },
    //   error => {

    //   }
    // )
  }
}
