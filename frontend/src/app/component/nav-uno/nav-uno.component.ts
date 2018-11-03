import { Component, OnInit } from '@angular/core';
import { ConfigColorService } from '../../services/config-color.service';
import { LoginService } from '../../services/login.service'
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-nav-uno',
  templateUrl: './nav-uno.component.html',
  styleUrls: ['./nav-uno.component.css']
})
export class NavUnoComponent implements OnInit {

  colorUno:any =  null;

  isSession  = localStorage.getItem('session_user')
  
  userName:any;

  constructor(
    private _color: ConfigColorService,
    private _loginService: LoginService,
    private _alertsService: AlertsService
  ) { }

  ngOnInit() {

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
        }        
      }
    )

    if (this.isSession){
      this._loginService._getAuthUser().subscribe(
        (resp:any) => {
          this.userName = resp.userName;
        },
        error => {
          console.log(error);
        }
      )
    }
    
  }

  salirLogin(){
    this._loginService._salirLogin().subscribe(
      (resp:any) => { 
        this._alertsService.msg('OK','Saliendo')
        localStorage.removeItem('access_token')
        localStorage.removeItem('session_user')
        location.href="/"        
      },
      error => { 
        this._alertsService.msg('ERR','Algo salio.')
      }
    )
  }
}
