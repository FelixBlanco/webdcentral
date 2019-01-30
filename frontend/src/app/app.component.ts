import { Component } from '@angular/core';
import { ConfigHomeService } from './services/config-home.service';
import { LoginService } from './services/login.service'
import { CarritoService } from './services/carrito.service'
import { ConfigColorService } from './services/config-color.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showLateralCar:boolean =false;
  constructor(    
    private loginS: LoginService,
    private _configHomeService:ConfigHomeService,
    private carritoService:CarritoService,
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
    this.carritoService.carritoItems.subscribe((val)=> {
      if(val.length){
        console.log(val);
        this.showLateralCar=true;
      }else{
        this.showLateralCar=false;
      }
  
    })
  }
}
