import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';

declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  v_register:any = { 
    nombre:null, username:null,
    email:null,  password: null,
    password_r : null,
  }

  constructor(
    private _registerService:RegisterService
  ) { }

  ngOnInit() {
  }

  verificacionPassword(){
    if(this.v_register.password != this.v_register.password_r){
      console.log('password no es igual');
    }
  }

  addRegister(){
    const data = { 
      name: this.v_register.nombre,
      email: this.v_register.email,
      password: this.v_register.password,
      userName: this.v_register.username,
      password_confirmation: this.v_register.password
    };
    this._registerService._addRegister(data).subscribe( 
      (resp:any) => { 
        if(resp.status == '200'){
          // Esperando redireccionamiento. 
          $("#registraseModal").modal('hide');
        }
       },
       error => {
         console.log(error);
       }
    );

  }

}
