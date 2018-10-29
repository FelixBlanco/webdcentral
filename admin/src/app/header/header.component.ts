import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  dataUser:any ={ userName: localStorage.getItem('userName'), img_perfil:localStorage.getItem('img_perfil') } 

  constructor(
    private loginService:LoginService,
    private _alerts:AlertsService
  ) { }

  ngOnInit() {
    this._alerts.Success('Hola');
  }

  salirLogin(){
    this.loginService._salirLogin().subscribe(
      (resp:any) => { 
        // this._alerts.Success('Saliendo...') // informamos 
        localStorage.removeItem('access_token') // borramos el token
        location.reload(); // reiniciamos la pagina
      },
      error => { console.log('algo salio mal'); console.log(error) }
    )
  }

}
