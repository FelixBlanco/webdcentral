import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

declare var $:any;
interface Question{
  idPreguntaFrecuente;
  pregunta;
  respuesta;
  fk_idStatusSistema;
}

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent implements OnInit {

  @ViewChild('table') table;

  questions: Array<Question>;
  rows: Array<Question>;
  columns: any;
  questionForm: FormGroup;
  questionUpdateForm: FormGroup;
  limit: number = 5;
  questionToUpdate: Question;

  inPromise: boolean;
  constructor(
    private preguntasService: PreguntasService, 
    private fb: FormBuilder,
    private ts: AlertsService
  ) { 
    
    this.questionForm = this.fb.group({
      pregunta: ['', Validators.required],//Agregar validators
      respuesta: ['', Validators.required]//Agregar Validators
    });

    this.questionUpdateForm = this.fb.group({
      pregunta: ['', Validators.required],//Agregar validators
      respuesta: ['', Validators.required]//Agregar Validators
    });

    this.list();

    this.columns = [
      { prop: 'idPreguntaFrecuente'},
      { prop: 'pregunta' },
      { prop: 'respuesta' },
      { prop: 'fk_idStatusSistema' },
      { prop: 'opts'}
    ];
  }
  

  ngOnInit() {
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.questions.filter(function(d) {
      return (d.pregunta.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.respuesta.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }

  list(){
    this.preguntasService.getAll(null).subscribe((resp) => {
      if(resp.ok && resp.status === 202){
        this.questions = resp.body.PFrec as Array<Question>;
        this.rows = [...this.questions];
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, (error) => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    });
  }

  save(){
    this.inPromise =true;
    const val = this.questionForm.value;
    this.preguntasService.persist({pregunta: val.pregunta, respuesta: val.respuesta}).subscribe((resp) => {
      if(resp.ok && resp.status === 201){
        this.list();
        this.ts.msg("OK","Éxito", "Se ha guardado el registro");
        $('#nuevo').modal('hide');
        this.questionForm.reset();
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
      this.inPromise =false;
    }, (error) => {
      this.inPromise =false;
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    })
  }

  update(){
    const val = this.questionUpdateForm.value;
    const question = this.questionToUpdate;

    this.inPromise = true;
    this.preguntasService.update(
      {
        idPreguntaFrecuente: question.idPreguntaFrecuente, 
        pregunta: val.pregunta, 
        respuesta: val.respuesta
      }
    ).subscribe((resp)=> {
      if(resp.ok && resp.status === 200){
        this.ts.msg("OK","Éxito", "Se ha actualizado el registro");
        $('#modificar').modal('hide');
        this.questionUpdateForm.reset();
        this.list();
      }else{
        console.error(resp);
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
      this.inPromise = false;
    },(error) => {
      console.error(error);
      this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      this.inPromise = false;
    })
  }

  delete(){
    this.inPromise = true;
    this.preguntasService.delete(this.questionToUpdate.idPreguntaFrecuente)
      .subscribe((resp)=>{
        if(resp.ok && resp.status === 200){
          this.ts.msg("OK","Éxito", "Se ha eliminado el registro");
          this.list();
          $('#eliminar').modal('hide');
        }else{
          this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
        }
        this.inPromise = false;
      },(error) => {
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
        this.inPromise = false;
      });
  }

  set({idPreguntaFrecuente,pregunta,respuesta, fk_idStatusSistema}){
    this.questionToUpdate = {
      idPreguntaFrecuente: idPreguntaFrecuente,
      pregunta: pregunta,
      respuesta: respuesta,
      fk_idStatusSistema: fk_idStatusSistema
    }

    this.questionUpdateForm.get('pregunta').setValue(pregunta);
    this.questionUpdateForm.get('respuesta').setValue(respuesta);
  }

  updateStatus(){
    const status = (this.questionToUpdate.fk_idStatusSistema === 1) ? 2: 1;
    this.inPromise = true;
    this.preguntasService.updateStatus(
      {
        idPreguntaFrecuente: this.questionToUpdate.idPreguntaFrecuente,
        fk_idStatusSistema: status
      }).subscribe((resp) => {
        if(resp.ok && resp.status === 200){
          this.ts.msg('OK',"Éxito", "Se ha actualizado el estatus");
          this.list();
          $('#estatus').modal('hide');
        }else{
          console.error(resp);
          this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
        }
        this.inPromise = false;
      }, (error) => {
        console.error(error);
        this.inPromise = false;
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      })
  }

  rowClass(){
    return 'text-capitalize';
  }
}
