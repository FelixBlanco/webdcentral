import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private _registerService:RegisterService,
    private route: ActivatedRoute,
    private router: Router,
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
    
    if(this.v_register.password.length != 0){
      
      if(this.v_register.password.length <= 8){
        console.log('el password tiene que ser mayor de 8 caracteres')
      }
  
      if(this.v_register.password == this.v_register.password_r){
        console.log('los pasword no es igual ')
      }

    }
    
    const data_i:any = { 
      name: this.v_register.nombre,
      email: this.v_register.email,
      password: this.v_register.password,
      userName: this.v_register.username,
      password_confirmation: this.v_register.password,
      fk_idPerfil: 2
    };

    /* agregar las imagenes
    let formData: FormData = new FormData(); // Damos Formato
    formData.append('foto',this.v_register.foto_perfil);
    */

    this._registerService._addRegister(data_i).subscribe( 
      (resp:any) => { 
        localStorage.getItem('access_token')
        $("#registraseModal").modal('hide');
        location.href="/home";
      },
       (error:any) => {
         console.log(error.error.errors);
       }
    );

  }

}
