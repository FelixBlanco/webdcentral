import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data:any = {
    name:null, email:null, username:null, password:null 
  }
  constructor(
    private _registerService:RegisterService
  ) { }

  ngOnInit() {
  }

  addRegister(){
    this._registerService.addRegistro(this.data);
  }

}
