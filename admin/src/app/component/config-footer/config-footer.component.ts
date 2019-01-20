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
  myFormHorariosFestivos: FormGroup;
  showHorarioRegular:boolean=true;
  ShowHorarioFestivo:boolean=false;
  inPromise: boolean;
  inPromiseHorario: boolean;
  rowsHorarios: any =[];  // rows para la tabla del modal
  rowsHorarios2: any = [];
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
      url_mercadopago: [''],
      link_otra_pagina: [''],
      url_app_store: [''],
      url_google_play: [''],
    })
    this.myFormHorarios = this.fb.group({
      diaRegular: ['', Validators.required],
      desdeRegular: ['', Validators.required],
      hastaRegular: ['', Validators.required],
    })
    this.myFormHorariosFestivos = this.fb.group({
      diaFestivo: ['', Validators.required],
      desdeFestivo: ['', Validators.required],
      hastaFestivo: ['', Validators.required],
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
            subtes: resp.subtes,
            colectivos: resp.colectivos,
            avenidas: resp.avenidas,
            listaPrecio: resp.listaPrecio,
            url_mercado_libre: resp.url_mercado_libre,
            link_otra_pagina: resp.link_otra_pagina,
            url_app_store: resp.url_app_store,
            url_google_play: resp.url_google_play,
            url_mercadopago: resp.url_mercadopago

          })
        }
      }
    )
  }
  addHorarios(fecha,desde,hasta,isRegular:boolean) {  // recibimos los datos desde el formulario
    if(desde>hasta){
      this._alertService.msg('ERR','horario invalido ');
      return;
    }
    this.inPromiseHorario=true;
    // creamos el string cn el formato Date
    const dateString=`${fecha}T${desde}`;  
    const dateString2= `${fecha}T${hasta}`
    const dateDesde:Date = new Date(dateString); 
    const dateHasta:Date = new Date(dateString2);
    console.log(dateDesde);
    console.log(dateHasta);
   //  this.rowsHorarios.push(value1);
   // creamos el dato para enviarlo a la bd
    this.horarios ={
      desde:dateString,
      hasta:dateString2,
      // falta el dato de si es dia regular o festivo .. pendiente..
    }
    //agregamos en la base de datos
    this._horariosAtencionService._addHorarios(this.horarios).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getHorarios();
        this._alertService.msg('OK', resp.msj);
        this.inPromiseHorario = false;
      }
    ) 
  
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
    this._horariosAtencionService._getHorarios(null).subscribe(
      (resp: any) => {
        this.inPromiseHorario = false;
        //Aqui validar si resp.EsFestivo(o el nombre de la base de datos)

        this.rowsHorarios = resp;
        this.rowsHorarios2=resp;
        if (!resp) {
          return;
        }
        resp.map((val, i) => {

          //Agregaremos el nombre del dia al row de las fechas, esto para mostrar el dia en la vista , LUN,MAR,MIER ...
          const dateTimeDesde: Date = new Date(val.desde);
          const dateTimeHasta: Date = new Date(val.hasta);
          const diaDesde: string = this.days[dateTimeDesde.getDay() - 1];
          const diaHasta: string = this.days[dateTimeDesde.getDay() - 1];
          //dando mejor formato
          const dateStringDesde = dateTimeDesde.getUTCFullYear() + "/" + (dateTimeDesde.getUTCMonth() + 1) + "/" + dateTimeDesde.getUTCDate() + " " + dateTimeDesde.getHours() + ":" + dateTimeDesde.getUTCMinutes() + ":" + dateTimeDesde.getUTCSeconds();
          const dateStringHasta = dateTimeHasta.getUTCFullYear() + "/" + (dateTimeHasta.getUTCMonth() + 1) + "/" + dateTimeHasta.getUTCDate() + " " + dateTimeHasta.getHours() + ":" + dateTimeHasta.getUTCMinutes() + ":" + dateTimeHasta.getUTCSeconds();

          this.rowsHorarios[i].desde = `${diaDesde} - ${dateStringDesde} Hrs`;this.rowsHorarios2[i].desde = `${diaDesde} - ${dateStringDesde} Hrs`;
          this.rowsHorarios[i].hasta = `${diaHasta} - ${dateStringHasta} Hrs`;this.rowsHorarios2[i].hasta = `${diaHasta} - ${dateStringHasta} Hrs`;
          // dateTime.setDate(val.desde); 
          console.log(dateTimeDesde.getDay());
        })
      })
  
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
