import { Component, OnInit } from '@angular/core';
import { ConfigHomeService } from '../../services/config-home.service';
import { UserTokenService } from 'src/app/services/user-token.service';

declare var $:any;

@Component({
  selector: 'app-nav-dos',
  templateUrl: './nav-dos.component.html',
  styleUrls: ['./nav-dos.component.css']
})
export class NavDosComponent implements OnInit {
  

  token:string;

  c_h:any = {
    set_logo: null
  };

  constructor(
    private _configHomeService:ConfigHomeService,
    private userToken: UserTokenService
  ) { }

  ngOnInit() {
    this.getConfigHome();

    this.userToken.token.subscribe(val => this.token = val);
  }

  getConfigHome(){
    this._configHomeService._getConfigHome().subscribe(
      (resp:any) => {

        if(resp){
          this.c_h.set_logo = resp.set_logo;
        }else{
          this.c_h.set_logo = null;
        }
      }
    )
  }
}
