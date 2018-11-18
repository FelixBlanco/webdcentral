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

    constructor(private _registerService: RegisterService,
                private router: Router,
                private _alertService: AlertsService) {
    }

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
                this._alertService.msg('OK', 'Registrado')
                localStorage.getItem('access_token')
                $("#registraseModal").modal('hide');
                location.href = "/"; // Fix: Esto reinicia toda la aplicación los datos en memoria de productos, carrito de compra, etc se perderían
            },
            (error: any) => {
                //console.log(error);
                this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);

                if (error.error.errors.email != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.email}`);
                }
                if (error.error.errors.name != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.name}`);
                }
                if (error.error.errors.password != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.password[0]}`);
                }
            }
        );


    }
}

