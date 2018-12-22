import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';
import { AlertsService } from '../../services/alerts.service'
import { HorariosAtencionService } from '../../services/horarios-atencion.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

declare var $;// para poder usar Jquery

@Component({
  selector: 'app-config-footer',
  templateUrl: './config-footer.component.html',
  styleUrls: ['./config-footer.component.css']
})
export class ConfigFooterComponent implements OnInit {
  myForm: FormGroup;
  myFormHorarios: FormGroup;
  inPromise: boolean;
  inPromiseHorario: boolean;
  rowsHorarios: any;  // rows para la tabla del modal
  rowsHorarios2: any;
  limit: number = 5;  // limites tablas del modal
  horarios: any;
  validator: boolean = false;
  days: Array<string> = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"];

  constructor(
    private _confgFooterService: ConfgFooterService,
    private _horariosAtencionService: HorariosAtencionService,
    private _alertService: AlertsService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      direccion: ['', Validators.required],
      nroContacto: ['', Validators.required],
      mail1: ['', Validators.email],
      mail2: ['', Validators.email],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      whatsApp1: ['', Validators.required],
      whatsApp2: [''],
      subtes: [''],
      colectivos: [''],
      avenidas: [''],
      listaPrecio: [Validators.min(1), Validators.max(9)],
      url_mercado_libre: [''],
      link_otra_pagina: [''],
    })
    this.myFormHorarios = this.fb.group({
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getConfigFooter();

  }

  getConfigFooter() {
    this._confgFooterService._getConfigFooter().subscribe(
      (resp: any) => {
        if (resp) {
          
          this.myForm.setValue({
            direccion: resp.direccion,
            nroContacto: resp.nroContacto,
            mail1: resp.mail1,
            mail2: resp.mail2,
            latitud: resp.latitud,
            longitud: resp.longitud,
            whatsApp1: resp.whatsApp1,
            whatsApp2: resp.whatsApp2,
            horarios: resp.horarios,
            subtes: resp.subtes,
            colectivos: resp.colectivos,
            avenidas: resp.avenidas,
            listaPrecio: resp.listaPrecio,
            desde: resp.desde,
            hasta: resp.hasta,
            url_mercado_libre: resp.url_mercado_libre,
            link_otra_pagina: resp.link_otra_pagina,
          })
        }
      }
    )
  }
  addHorarios() {
    const { desde, hasta } = this.myFormHorarios.value;
    let mensajeErr: string = "Fechas Incorrectas";
    this.validator = false;
    if (desde < hasta) {   // validamos que la fecha desde sea menor que la fecha hasta
      this.validator = true;
      this.horarios = {
        "desde": desde,
        "hasta": hasta,
      }
     
      this.rowsHorarios.map( // Validamos que las fechas no se encuentren registradas
        val => {
          desde > val.hasta && this.validator ? this.validator = true : this.validator = false;
       
        });

      if (this.validator) {
        this.inPromiseHorario = true;
        this._horariosAtencionService._addHorarios(this.horarios).subscribe(
          (resp: any) => {
            this.getHorarios();
            this._alertService.msg('OK', resp.msj);
            this.inPromiseHorario = false;
          }
        )
      } else {
        mensajeErr = "La fecha ya existe";
      }

    }
    !this.validator && this._alertService.msg("ERR", mensajeErr);

  }
  
  set(row: any) { // recibe la fila de los horarios seleccionados en la tabla "horarios"
    this.horarios = row;
  
  }

  deleteHorarios() {
    this.inPromiseHorario = true;
    this._horariosAtencionService._deleteHorarios(this.horarios.idHorarioAtencion).subscribe(
      (resp: any) => {
        $("#eliminar").modal('hide');
        this.getHorarios();
        this._alertService.msg('OK', resp.msj);
        this.inPromiseHorario = false;
      }

    )
  }
  getHorarios() {
    this.inPromiseHorario = true;
    this._horariosAtencionService._getHorarios(null).subscribe(
      (resp: any) => {
        this.inPromiseHorario = false;
        this.rowsHorarios = resp;


      }
    )
  }

  upgradeCondigFooter() {
    this.inPromise = true;
    const val = this.myForm.value;
 
    this._confgFooterService._upgradeConfigFooter(val).subscribe(
      (resp: any) => { this.inPromise = false; this.getConfigFooter(); this._alertService.msg("OK", resp.msj); },
      error => {

        this.inPromise = false;

        if (error.error.errors.direccion != null) {
          this._alertService.msg("ERR", error.error.errors.direccion);
        }

        if (error.error.errors.nroContacto != null) {
          this._alertService.msg("ERR", error.error.errors.nroContacto);
        }

        if (error.error.errors.mail1 != null) {
          this._alertService.msg("ERR", error.error.errors.mail1);
        }

        if (error.error.errors.latitud != null) {
          this._alertService.msg("ERR", error.error.errors.latitud);
        }

        if (error.error.errors.longitud != null) {
          this._alertService.msg("ERR", error.error.errors.longitud);
        }

        if (error.error.errors.whatsApp1 != null) {
          this._alertService.msg("ERR", error.error.errors.whatsApp1);
        }

        if (error.error.errors.horarios != null) {
          this._alertService.msg("ERR", error.error.errors.horarios);
        }

        if (error.error.errors.subtes != null) {
          this._alertService.msg("ERR", error.error.errors.subtes);
        }

        if (error.error.errors.colectivos != null) {
          this._alertService.msg("ERR", error.error.errors.colectivos);
        }

        if (error.error.errors.avenidas != null) {
          this._alertService.msg("ERR", error.error.errors.avenidas);
        }

        if (error.error.errors.listaPrecio != null) {
          this._alertService.msg("ERR", error.error.errors.listaPrecio);
        }

        if (error.error.errors.desde != null) {
          this._alertService.msg("ERR", error.error.errors.desde);
        }

        if (error.error.errors.hasta != null) {
          this._alertService.msg("ERR", error.error.errors.listaPrecio);
        }

        if (error.error.errors.url_mercado_libre != null) {
          this._alertService.msg("ERR", error.error.errors.url_mercado_libre);
        }

      }
    );
  }
}
