import { Component } from '@angular/core';
import { ConfigHomeService } from './services/config-home.service';
import { LoginService } from './services/login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(    
    private loginS: LoginService,
    private _configHomeService:ConfigHomeService
    ){

      this.loginS._getAuthUser().subscribe(
        resp => {
          //  SI todo esta bien lo vamos a dejar 
        },
        error =>{
          // Si manda error borramos todos los datos del localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('user_data');
        }
      )

      this._configHomeService._getConfigHome().subscribe(
        (resp:any) => {
          if(resp){
            document.getElementById("body").style.backgroundColor = resp.color;
          }
        }
    )
  }
}
