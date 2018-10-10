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
    foto_perfil: null, 
  }

  constructor(
    private _registerService:RegisterService
  ) { }

  ngOnInit() {
  }


  upFoto(event){
    var foto_x : File = event.target.files[0]; // Ubicamos la IMG
    this.v_register.foto_perfil = foto_x
  }

  verificacionPassword(){
    if(this.v_register.password != this.v_register.password_r){
      console.log('password no es igual');
    }
  }

  addRegister(){
    
    const data_i:any = { 
      name: this.v_register.nombre,
      email: this.v_register.email,
      password: this.v_register.password,
      userName: this.v_register.username,
      password_confirmation: this.v_register.password
    };
    /* agregar las imagenes
    let formData: FormData = new FormData(); // Damos Formato
    formData.append('foto',this.v_register.foto_perfil);
    */

    this._registerService._addRegister(data_i).subscribe( 
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
