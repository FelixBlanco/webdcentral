import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnoService, Turno } from 'src/app/services/turno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

declare var $: any;

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {

  @ViewChild('table') table: any;

  limit: number = 5;

  columns: any = [
    { prop: 'status_turno' },
    { prop: 'set_imagen' },
    { prop: 'fk_idStatusSistema' },
    { prop: 'opts' }
  ];

  rows: any;

  newForm: FormGroup;
  turnoSet: Turno;

  inPromise: boolean;
  imgLoaded: File;

  turnoList: Turno[] = [];

  constructor(
    private turnoService: TurnoService,
    private as: AlertsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAll();

    this.newForm = this.fb.group({
      status_turno: ['1', Validators.required],
      fechaHora: ['', Validators.required]
    });
  }


  getAll() {
    this.turnoService.getAll().subscribe((resp) => {
      if (resp.ok) {
        console.log("datos varios");
        console.log(resp.body);
        console.log(resp.body.turnos);
        this.turnoList = resp.body.turnos;
        this.rows = [...this.turnoList];
      }
    }
    )
  }

  save() {
    const values = this.newForm.value;
    console.log(values);
    let toSend: FormData = new FormData();
    toSend.append('fk_idStatusTurnos', values.status_turno);
    toSend.append('fechaHora',"2000-01-30 00:00:00");
    toSend.append('fk_idLocalAdherido', "1");    
    toSend.append('fk_idClasificado', "1");
    
    this.inPromise = true;
    this.turnoService.persist(toSend).subscribe(
      (resp) => {
        if (resp.ok && resp.status === 201) {
          this.as.msg("OK", "Éxito", "Se ha guardado el registro");
          this.newForm.reset();
          $('#nuevo').modal('hide');
        } else {
          console.error(resp);
          this.as.msg("OK", "Error", "Ha ocurrido un error interno");
        }
        this.getAll();
        this.inPromise = false;
      },
      error => {
        this.getAll();
        this.inPromise = false;
        console.log(error);
        this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    )
  }

  delete() {
    this.inPromise = true;
    this.turnoService.delete(this.turnoSet.idGaleriaHomeProducto).subscribe(
      resp => {
        console.log(resp);
        if (resp.ok && resp.status === 200) {
          $('#eliminar').modal('hide');
          this.as.msg('OK', 'Éxito', 'Se elimino correctamente');

        } else {
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        }
        this.getAll();
        this.inPromise = false;
      },
      error => {
        console.error(error);
        this.inPromise = false;
        this.getAll();
        this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  updateStatus() {
    this.inPromise = true;

    const status: number = this.turnoSet.fk_idStatusSistema === 1 ? 0 : 1;

    this.turnoService.updateStatus(this.turnoSet.idGaleriaHomeProducto, status).subscribe(
      resp => {
        if (resp.ok && resp.status === 201) {
          $('#estatus').modal('hide');
          this.as.msg('OK', 'Éxito', 'Se ha actualizado el estatus');
        } else {
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        }
        this.getAll();
        this.inPromise = false;
      }, error => {
        this.inPromise = false;
        console.error(error);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const fileTo: File = event.target.files[0];

      if (!fileTo.type.includes('image/png')
        && !fileTo.type.includes('image/jpg')
        && !fileTo.type.includes('image/jpeg')) {
        this.as.msg('ERR', 'Error:', 'El archivo no es admitido o no es una imagen');
        this.newForm.patchValue({
          imagen: null
        });
        return;
      }

      if (fileTo.size > 5000000) {
        this.as.msg('ERR', 'Error:', 'El archivo es muy pesado');
        this.newForm.patchValue({
          imagen: null
        });
        return;
      }

      this.imgLoaded = fileTo;
      this.newForm.patchValue({
        imagen: fileTo
      });
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.turnoList.filter(function (d) {
      return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val)
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  showImage(row: any) {
    this.turnoSet = row;
    $('#imagen').modal('toggle');
  }

  set(row: any) {
    this.turnoSet = row;
  }

}

