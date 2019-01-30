import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {AlertsService} from '../../services/alerts.service';
import {Router, ActivatedRoute} from '@angular/router';
import { UserTokenService, UserData } from 'src/app/services/user-token.service';
import { ConfigColorService } from '../../services/config-color.service';

declare var $: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: any;
    password: any;
    errors: any;
    colorUno:any;
    inPromise: boolean;

    constructor(
        private _loginService: LoginService,
        private _alertService: AlertsService,
        private userToken: UserTokenService,
        private router: Router,
        private configColor: ConfigColorService,
    ) { }

    ngOnInit() {

        this.configColor._paletaColor().subscribe(
            (resp:any)=> {
                this.colorUno = resp.colorOscuro
            }
        )          
    }

    ingresarLogin() {

        this.inPromise = true;
        const data: any = {email: this.email, password: this.password};
        this._loginService.ingresarLogin(data).subscribe(
            (resp: any) => {
                const token = resp.access_token;
                localStorage.setItem('token', token);
            
                this._loginService._getAuthUser().subscribe((resp: UserData) => {
                    localStorage.setItem('user_data', JSON.stringify(resp));

                    this.validateSuscription(resp.email);

                    this.userToken.updateUserToken(token);
                    this.userToken.updateUserData(resp);
                    $("#loginModal").modal('hide');
                    this._alertService.msg('INFO', 'Info', `Has iniciado sesión como '${this.userToken.getUserData().userName}'`);
                    this.inPromise = false;
                    
                },error => {

                    this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);
                    this.inPromise = false;                    
                })
                
            },
            (error: any) => {
                this.inPromise = false;
                if (error.error.message != null) {
                    this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);
                }
                if (error.error.errors.email != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.email}`);
                }
                if (error.error.errors.password != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.password[0]}`);
                }
            }
        );
    }

    validateSuscription(email: string){
        this._loginService.buscarSuscripcionBy(email).subscribe((resp) => {
            if(resp.ok && resp.status === 200){
                if(!resp.body.count){
                    this._alertService.msg(
                        'INFO', 
                        'Info', 
                        'Te recomendamos que te suscribas a nuestras novedades, puedes hacer click acá para comenzar',
                        { timeOut:10000, progressBar: true }
                    ).onTap.subscribe(
                        () => {
                            this.router.navigate(['/']);
                            setTimeout(()=> {
                                let novedades = document.getElementById('novedades');
                                novedades.scrollIntoView({behavior: 'smooth'});
                                document.getElementById('novedadInput').focus();
                                novedades.style.border = "5px #e8a719 solid";
                                setTimeout(()=> {
                                    novedades.style.border = "none";
                                }, 3000);

                            },1000);
                        }
                    );
                }
            }else{
                console.error(resp);
                this._alertService.msg('ERR', 'Error', 'Ha ocurrido un error interno');

            }
        },error => {
            console.error(error);
            this._alertService.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        })

    }

    routeToLogin(){
        $("#loginModal").modal('hide');
        setTimeout(() =>  $("#registraseModal").modal('show'), 500);
    }

    irToForget(){
        $('#loginModal').modal('hide');
        setTimeout(() =>  $("#olvidarContrasenaModal").modal('show'), 500);  
    }     
}
