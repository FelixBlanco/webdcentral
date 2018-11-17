import { Component, OnInit } from '@angular/core';
import { ConfigColorService } from '../../services/config-color.service';
import { LoginService } from '../../services/login.service'
import { AlertsService } from '../../services/alerts.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-nav-uno',
  templateUrl: './nav-uno.component.html',
  styleUrls: ['./nav-uno.component.css']
})
export class NavUnoComponent implements OnInit {

  colorUno:any =  null; colorDos:any=null;

  myToken:any = localStorage.getItem('access_token');

  isSession:any; 
  
  userName:any;

  badgeContent: number = 0;

  constructor(
    private _color: ConfigColorService,
    private _loginService: LoginService,
    private _alertsService: AlertsService,
    private carritoService: CarritoService
  ) { }

  ngOnInit() {

    this.initBadgeBehavior();

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
          this.colorDos = resp.colorMedio;
        }        
      }
    )

    if (this.myToken){
      this._loginService._getAuthUser().subscribe(
        (resp:any) => {
          this.userName = resp.userName;
        },
        error => {
          console.log(error);
        }
      )
    }

    
    if (this.myToken) {
      this.isSession = localStorage.getItem('session_user')
    }else{
      this.isSession = null;
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

  initBadgeBehavior(){
    this.carritoService.carritoItems.subscribe((vals) => {
      console.log('mmm',vals);
      this.badgeContent = vals.length
    });
  }
}
