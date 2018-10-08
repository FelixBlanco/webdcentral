import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  v_register:any = { 
    nombre:null, username:null,
    email:null,  password: null,
  }
  constructor(
    private _registerService:RegisterService
  ) { }

  ngOnInit() {
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
      resp => { console.log( resp ) }
    );

  }

}
