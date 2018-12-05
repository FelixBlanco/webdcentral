import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TurnoService, Turno } from 'src/app/services/turno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { ClasificadosService } from '../../services/clasificados.service';
import { LocalesAdheridosService } from '../../services/locales-adheridos.service';
import { EstatusTurnoService } from '../../services/estatus-turno.service';

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
    { prop: 'idTurnos' },
    { prop: 'clasificado' },
    { prop: 'fk_idLocalAdherido' },
    { prop: 'fk_idClasificado' },
    { prop: 'fechaHora' }
  ];

  rows: any;
  rowsClasificados: any;
  rowsLocalAdheridos: any;
  rowsEstatusTurno: any;

  newForm: FormGroup;
  updateForm: FormGroup;
  turnoSet: Turno;

  inPromise: boolean;
  imgLoaded: File;
  fechaHora: string;
  turnoList: Turno[] = [];

  constructor(
    private turnoService: TurnoService,
    private clasificadoService: ClasificadosService,
    private localesAdheridosServices: LocalesAdheridosService,
    private estatusTurno: EstatusTurnoService,
    private as: AlertsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAll();
    this.getClasificacidos();
    this.getLocalesAdheridos();
    this.getEstatusTurno();

    this.newForm = this.fb.group({
      fk_idLocalAdherido: ['', Validators.required],
      fk_idClasificado: ['', Validators.required],
      fechaHora: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      fk_idLocalAdherido: [''],
      fk_idClasificado: [''],
      fk_idStatusTurnos: [''],
      fechaHora: [''],
      idTurnos: [''],
    });
  }

  getAll() {
    this.turnoService.getAll().subscribe((resp) => {
      if (resp.ok) {
        this.turnoList = resp.body.turnos;
        this.rows = [...this.turnoList];
        console.log("this.rows");
        console.log(this.rows);
      }
    }
    )
  }

  getClasificacidos() {
    this.clasificadoService._getClasificados(null).subscribe(
      (resp: any) => {
        this.rowsClasificados = [...resp.Clasificado];
        console.log("this.rowsClasificados");
        console.log(this.rowsClasificados);
      }
    )
  }


  getLocalesAdheridos() {
    this.localesAdheridosServices._listarLocales(1).subscribe(
      (resp: any) => {
        this.rowsLocalAdheridos = [...resp.LocalAdh];
        console.log("this.rowsLocalAdheridos");
        console.log(this.rowsLocalAdheridos);
      }
    )
  }

  getEstatusTurno() {
    this.estatusTurno.getAll().subscribe(
      (resp: any) => {
        this.rowsEstatusTurno = Object.values(resp.body.lista);        
        console.log("this.rowsEstatusTurno");
        console.log(this.rowsEstatusTurno);
      }
    )
  }

  save() {
    const values = this.newForm.value;
    console.log("values", values);
    let toSend: FormData = new FormData();

    toSend.append('fechaHora', values.fechaHora);
    toSend.append('fk_idLocalAdherido', values.fk_idLocalAdherido);
    toSend.append('fk_idClasificado', values.fk_idClasificado);
    toSend.append('fk_idStatusTurnos', '1');

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

  getTurno(data: any) {
    console.log("editTurno", data);
    this.turnoService.getTurno(data.idTurnos).subscribe(
      (resp: any) => {
        console.log("resp desde el componente", resp.body.turnos);
        this.fechaHora = resp.body.turnos.fechaHora;
        this.updateForm.patchValue({
          fk_idLocalAdherido: resp.body.turnos.fk_idLocalAdherido,
          fk_idClasificado: resp.body.turnos.fk_idClasificado,
          fk_idStatusTurnos: resp.body.turnos.fk_idStatusTurnos,
          fechaHora: new Date(resp.body.turnos.fechaHora),
          idTurnos: resp.body.turnos.idTurnos,
          //MM-dd-yyyy HH:mm
        })
        $("#editarTurnoModal").modal('show');
      }
    )
  }

  delete() {
    this.inPromise = true;
    console.log("this.idTurnos", this.turnoSet)
    this.turnoService.delete(this.turnoSet.idTurnos).subscribe(
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

  update() {
    console.log("update");
    const val = this.updateForm.value;
    console.log("val",val);
    delete val['fechaHora'];
    console.log("val",val);
    
    this.inPromise = true;
    this.turnoService.update(val).subscribe((resp) => {
      if (resp.ok && resp.status === 200) {
        this.as.msg("OK", "Éxito", "Se ha actualizado el registro");
        $('#editar').modal('hide');
        this.updateForm.reset();
        this.getAll();
      } else {
        console.error(resp);
        this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
      this.inPromise = false;
    }, (error) => {
      console.error(error);
      this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
      this.inPromise = false;
    })
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    console.log(this.turnoList);
    const temp = this.turnoList.filter(function (d) {
      console.log("d", d);
      console.log("d", d.clasificado.titulo);
      return (d.clasificado.titulo.toLowerCase().indexOf(val) !== -1 || !val);

    });
    console.log(temp);
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

