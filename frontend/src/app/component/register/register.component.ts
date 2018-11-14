import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  v_register:any = { 
    nombre:null, celular:null,
    email:null,  password: null,
    password_r : null,
    foto_perfil: null, 
  }

  constructor(
    private _registerService:RegisterService,
    private router: Router,
    private _alertService: AlertsService
  ) { }

  ngOnInit() {
  }


  upFoto(event){
    var foto_x : File = event.target.files[0]; // Ubicamos la IMG
    this.v_register.foto_perfil = foto_x
  }

  addRegister(){

    if(!this.v_register.celular || !this.v_register.email || !this.v_register.cedular){
      this._alertService.msg("ERR", "Error", 'Todos los campos son requeridos');
    }

    if(this.v_register.password && this.v_register.password_r && this.v_register.celular){
      if(this.v_register.password.length != 0){
        if(this.v_register.password.length <= 8){
          this._alertService.msg("ERR", "Error", 'el password tiene que ser mayor de 8 caracteres');
        }else{
          if(this.v_register.password == this.v_register.password_r){
            
            const data_i:any = { 
              email: this.v_register.email,
              password: this.v_register.password,
              celular: this.v_register.celular,
              password_confirmation: this.v_register.password,
              fk_idPerfil: 2
            };
            console.log(data_i);

            this._registerService._addRegister(data_i).subscribe( 
              (resp:any) => { 
                this._alertService.msg('OK','Registrado')
                localStorage.getItem('access_token')
                $("#registraseModal").modal('hide');
                location.href="/";
              },
              (error:any) => {
                this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
              }
            );
                
          }else{
            this._alertService.msg("ERR", "Error", 'los pasword no es igual');
          }
      }      
    }else{
      this._alertService.msg("ERR", "Error", 'Todos los campos son requeridos');
      
    }


  }

}}
