import { Component } from '@angular/core';
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoged = localStorage.getItem('sesion_login'); // variable para mostrar login
  constructor( private loginS:LoginService){
    this.loginS._getAuthUser(localStorage.getItem('access_token')).subscribe(
      (resp:any) => {
        // Session activa
      },
      error => {
        if(error.status == 401){ // Unauthorized 401
          /*localStorage.removeItem('access_token')
          localStorage.removeItem('imgPerfil')
          localStorage.setItem('sesion_login','false');
          localStorage.removeItem('userName')*/
          localStorage.clear();
        }
      }
    )
  }
}
