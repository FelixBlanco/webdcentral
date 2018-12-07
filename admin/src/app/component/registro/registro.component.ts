import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { AlertsService } from '../../services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  @Output() cambio: EventEmitter<any>= new EventEmitter();

  public form: any = {
    Email_Cliente: "",
    nameUser: "",
    nombreApellidoCliente: "",
    numeroDocumento: "",
    domicilio: "",
    codigoPostal: "",
    localidad: "",
    provincia: "",
    email: "",
    telefono: "",
  };

  constructor(
    private _registroService: RegistroService,
    private route: ActivatedRoute,
    private router: Router,
    private _alertService: AlertsService
  ) { }

  ngOnInit() {
  }

  ingresarRegistro(): void {
    console.log(this.form);
    this._registroService.verificarRegistro(this.form).subscribe(
      (resp: any) => {
        console.log("respuesta del verifica",resp);
        if (resp) {
          console.log("entro en el primer if",resp);
          this.form.idCliente = resp.idCliente;
          this._registroService.modificarRegistro(this.form).subscribe(
            () => {
              this._alertService.msg("OK", 'Registro Moddificado Exitosamente');
            },
            (error: any) => {
              // this._alertService.Erros(error.error.msj) // no autorizado | cuando hay error 
              // console.log("Hubo un error");
              this._alertService.msg("ERR", 'Hubo un Error 1');
            });
        } else {
          console.log("entro en el else");
          this._registroService.ingresarRegistro(this.form).subscribe(
            () => {
              // this._alertService.Success("Registro Agregado Exitosamente");
              this._alertService.msg("OK", 'Registro Agregado Exitosamente');
            },
            (error: any) => {
              this._alertService.msg("ERR", 'Hubo un Error 2');
              // this._alertService.Erros(error.error.msj) // no autorizado | cuando hay error 
            });
        }
      },
      (error: any) => {
        console.log(error);
        if (error.status == '422') {
          this._alertService.listError(error.error) // LIsta de errores
        }

        if (error.status == '401') {
          this._alertService.Erros(error.error.msj) // no autorizado | cuando hay error 
        }

        if (error.status == '500') {
          this._alertService.Erros(error.error.msj) // no autorizado | cuando hay error 
        }
      }
    );
  }

  change() {
    this.cambio.emit()
  }
}
