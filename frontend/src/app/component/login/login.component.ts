import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:any; password:any; 

  constructor(
    private _loginService:LoginService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ingresarLogin( ):void{
    const data:any = {email: this.email, password : this.password}; 
    this._loginService.ingresarLogin(data).subscribe(
      resp =>{
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
