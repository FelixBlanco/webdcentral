import { Component, OnInit } from '@angular/core';
import { ConfigColorService } from '../../services/config-color.service';
import { LoginService } from '../../services/login.service'
import { AlertsService } from '../../services/alerts.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ConfigRedesService } from '../../services/config-redes.service'
import { UserTokenService } from 'src/app/services/user-token.service';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';
import { Router } from '@angular/router';
import { FormGroup, Validator, FormBuilder, Validators  } from '@angular/forms'

declare var $:any;

@Component({
  selector: 'app-nav-uno',
  templateUrl: './nav-uno.component.html',
  styleUrls: ['./nav-uno.component.css']
})
export class NavUnoComponent implements OnInit {

  colorUno:any =  null; colorDos:any=null;
  
  userName:string;

  badgeContent: number = 0;

  linksR:any = { facebook:'#', instagram: '#', twitter: '#', whatsapp:'#'};

  token: string;

  inPromise: boolean;

  formOlvidarPassword: FormGroup;

  constructor(
    private _color: ConfigColorService,
    private _loginService: LoginService,
    private _alertsService: AlertsService,
    private carritoService: CarritoService,
    private configRedes: ConfigRedesService,
    private userToken: UserTokenService,
    private router: Router,
    private footerService:ConfgFooterService,
    private fb : FormBuilder
  ) { 
    this.formOlvidarPassword = this.fb.group({
      email : ['',[Validators.email, Validators.required]]
    })
  }

  ngOnInit() {
    this.helpStatus();
    this.initBadgeBehavior();
    this.initUserToken();
    this.userToken.userData.subscribe(val => this.userName = val ? val.userName : '');

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno = resp.colorOscuro;
          this.colorDos = resp.colorMedio;
        }        
      }
    )


    //Links Redes
    this.configRedes._getRed().subscribe(
      (resp:any) => {                
        if(resp){
          this.linksR.facebook  = resp.url_face
          this.linksR.twitter   = resp.url_twit;
          this.linksR.instagram = resp.url_inst;
          this.linksR.whatsapp  = resp.url_what;                  
        }        
      }
    )

  }

  salirLogin(){
    this.inPromise = true;
    this._loginService._salirLogin().subscribe(
      (resp:any) => {
        this.userToken.clear();
        $('#salirModal').modal('hide');
        this._alertsService.msg('INFO', 'Info', `Has cerrado tu sesión`);
        this.inPromise = false;
        this.router.navigate(['/']);
      },
      error => {
        this._alertsService.msg('ERR','Algo salio mal.');
        this.inPromise = false;
      }
    )
  }

  initBadgeBehavior(){
    this.carritoService.carritoItems.subscribe((vals) => {
      this.badgeContent = vals.length
    });
  }

  initUserToken(){
    this.userToken.token.subscribe(val => this.token = val);
  }
 helpStatus(){
 
    this.footerService.restartAyudaStatus(); 
  }

  forgetPassword(){    
    this.inPromise = true;
    this._loginService.forgetPassword(this.formOlvidarPassword.value.email).subscribe(
      (resp:any) => {
        this.inPromise = false;        
        if(resp.msj != null){
          this._alertsService.msg('OK',resp.msj)
        }              
      },
      error => {
        this.inPromise = false;
        if(error.errors.email != null){
          this._alertsService.msg('ERR',error.errors.email);
        }                
      }
    )
  }
}
