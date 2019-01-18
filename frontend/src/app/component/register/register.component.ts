import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {Router} from '@angular/router';
import {AlertsService} from '../../services/alerts.service';

declare var $: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


    v_register: any = {
        nombre: null, celular: null,
        email: null, password: null,
        password_r: null,
        foto_perfil: null,
    }

    constructor(
        private _registerService: RegisterService,
        private _alertService: AlertsService
    ) {}

    ngOnInit() {
    }

    upFoto(event) {
        var foto_x: File = event.target.files[0]; // Ubicamos la IMG
        this.v_register.foto_perfil = foto_x
    }

    addRegister() {

        const data_i: any = {
            name: this.v_register.nombre,
            email: this.v_register.email,
            password: this.v_register.password,
            celular: this.v_register.celular,
            password_confirmation: this.v_register.password_r,
            fk_idPerfil: 2
        };


        this._registerService._addRegister(data_i).subscribe(
            (resp: any) => {
                //TODO que se debe hacer con el cuerpo de respuesta? 
                this._alertService.msg('OK', 'Registrado');
                this._alertService.msg('OK', resp.msj);

                $("#registraseModal").modal('hide');
            },
            (error: any) => {
                
                if(error.error.message != null){
                    this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);
                }
                if (error.error.errors.email != null) {
                    this._alertService.msg("ERR", "Info", `Info: ${error.error.errors.email}`);
                }
                if (error.error.errors.name != null) {
                    this._alertService.msg("ERR", "Info", `Info: ${error.error.errors.name}`);
                }
                if (error.error.errors.password != null) {
                    this._alertService.msg("ERR", "Info", `Info: ${error.error.errors.password[0]}`);
                }
                if (error.error.errors.password_confirmation != null) {
                    this._alertService.msg("ERR", "Info", `Info: ${error.error.errors.password_confirmation[0]}`);
                }                
            }
        );


    }
}

