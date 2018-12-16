import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authbackend',
  templateUrl: './authbackend.component.html',
  styleUrls: ['./authbackend.component.css']
})
export class AuthbackendComponent implements OnInit {

  form:any = { email:null, password:null }
  inPromise: boolean;
  bandera: boolean = true;  

  constructor(
    private alerService:AlertsService,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  ingresarLogin(){
    this.inPromise = true;
    this.loginService.ingresarLogin(this.form).subscribe(
      (resp:any) =>{

        // Activamos la sesion
        // this.alerService.Success('Iniciando...')
        localStorage.setItem('access_token',resp.access_token)
        
        // Buscamos la informacion del usuario
        this.loginService._getAuthUser(resp.access_token).subscribe(
          
          (resp:any) => {

            // Guardamos en local, la informacion que reutilizamos 
            localStorage.setItem('userName',resp.userName);

            if(resp.img_perfil){
              localStorage.setItem('imgPerfil',resp.img_perfil);
            }
            this.inPromise = false;
            this.router.navigate(['/perfil']);
            // location.reload(); 
            // Actualizamos para iniciar
            
          }
        )
      },
      error => {
        this.inPromise = false;
        this.alerService.msg("ERR", 'El email o la contraseña son incorrecto.');
      }
    )
  }

  change() {
    this.bandera = !this.bandera;
  }
  
  changevalue() {
    console.log("me han dado click");
    this.bandera = !this.bandera;
  }
}