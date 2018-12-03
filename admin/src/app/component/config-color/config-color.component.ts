import {Component, OnInit} from "@angular/core";
import {ConfigColorService} from "../../services/config-color.service";
import {AlertsService} from "../../services/alerts.service";

@Component({
    selector: 'app-config-color',
    templateUrl: './config-color.component.html',
    styleUrls: ['./config-color.component.css']
})
export class ConfigColorComponent implements OnInit {

    colores: any;
    form: any = {colorOscuro: null, colorMedio: null, colorClaro: null}
    inPromise: boolean;

    constructor(private _coloresServices: ConfigColorService,
                private _alertServicices: AlertsService) {
    }

    ngOnInit() {
        this.getColores();
    }

    getColores() {
        this._coloresServices._getColor().subscribe(
            resp => {
                this.colores = resp
            }
        )
    }

    addColores() {
        this.inPromise = true;
        if (!this.form.colorOscuro || !this.form.colorMedio || !this.form.colorClaro) {
            this._alertServicices.msg('ERR', 'Error', 'Todos los campos son requeridos');
        } else {
            this._coloresServices.addColores(this.form).subscribe(
                resp => {
                    this.inPromise = false;
                    this.getColores();
                    this.form = {colorOscuro: null, colorMedio: null, colorClaro: null}
                    this._alertServicices.msg('OK', 'Éxito', 'Se guardo correctamente');
                },
                error => {
                    this.inPromise = false;
                    this._alertServicices.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
                }
            )
        }

    }

    eliminarColor(id) {
        this.inPromise = true;
        this._coloresServices.deleteColores(id).subscribe(
            resp => {
                this.inPromise = false;
                this._alertServicices.msg('OK', 'Éxito', 'Se actualizo correctamente');
                this.getColores();
            },
            error => {
                this.inPromise = false;
                this._alertServicices.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
            }
        )
    }

}
