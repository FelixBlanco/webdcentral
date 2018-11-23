import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {AlertsService} from '../../services/alerts.service';
import {Router, ActivatedRoute} from '@angular/router';
import { UserTokenService } from 'src/app/services/user-token.service';

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

    inPromise: boolean;

    constructor(
        private _loginService: LoginService,
        private _alertService: AlertsService,
        private userToken: UserTokenService
    ) { }

    ngOnInit() {
    }

    ingresarLogin() {

        this.inPromise = true;
        const data: any = {email: this.email, password: this.password};
        this._loginService.ingresarLogin(data).subscribe(
            (resp: any) => {
                const token = resp.access_token
                localStorage.setItem('access_token', token);
            
                this._loginService._getAuthUser().subscribe((resp: any) => {
                    localStorage.setItem('user_data', JSON.stringify(resp));

                    this.userToken.updateUserToken(token);
                    this.userToken.updateUserData(resp);
                    $("#loginModal").modal('hide');
                    this._alertService.msg('INFO', 'Info', `Has iniciado sesión como '${this.userToken.getUserData().userName}'`);
                    this.inPromise = false;
                    
                },error => {
                    this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);
                    this.inPromise = false;
                    console.error(error);
                })
                
            },
            (error: any) => {
                this.inPromise = false;
                console.log(error);
                this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);

                if (error.error.errors.email != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.email}`);
                }
                if (error.error.errors.password != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.password[0]}`);
                }
            }
        );


    }

    routeToLogin(){
        $("#loginModal").modal('hide');
        setTimeout(() =>  $("#registraseModal").modal('show'), 500);
    }
}
