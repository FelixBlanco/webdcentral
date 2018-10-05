import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:any; password:any; 

  constructor(
    private _loginService:LoginService
  ) { }

  ngOnInit() {
  }

  ingresarLogin(email= this.email, password = this.password ):void{
    const data:any = [email, password]; 
    this._loginService.ingresarLogin(data);
  }
}
