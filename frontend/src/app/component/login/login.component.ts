import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AlertsService } from '../../services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email:any; password:any; 
  errors:any;
  constructor(
    private _loginService:LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private _alertService: AlertsService
  ) { }

  ngOnInit() {}

  ingresarLogin( ){
  
    const data:any = {email: this.email, password : this.password}; 
    this._loginService.ingresarLogin(data).subscribe(
      (resp:any) =>{     
        localStorage.setItem('access_token',resp.access_token)
        localStorage.setItem('session_user','true')
        $("#loginModal").modal('hide');
        location.href="/";
      },
      (error:any) => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    );   

   
  }
}
