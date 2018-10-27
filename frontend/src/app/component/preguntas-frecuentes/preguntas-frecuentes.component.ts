import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Question{
  idPreguntaFrecuente;
  pregunta;
  respuesta;
  estatus;
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
  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) { 
    
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
      { prop: 'estatus' },
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
        //Ha ocurrido un error aplicar toaster
      }
    }, (error) => {
      //Error interno
    });
  }

  save(){
    if(this.questionForm.invalid){
      return;
    }

    const val = this.questionForm.value;
    this.preguntasService.persist({pregunta: val.pregunta, respuesta: val.respuesta}).subscribe((resp) => {
      if(resp.ok && resp.status === 201){
        console.log('?',resp);//Aplicar toaster
        this.questionForm.get('respuesta').setValue('');
        this.questionForm.get('pregunta').setValue('');
        this.list();
      }else{
        //ha ocurrido un error
      }
    }, (error) => {
      //Error interno
    })
  }

  update(){
    if(this.questionUpdateForm.invalid){
      return;
    }

    const val = this.questionUpdateForm.value;
    const question = this.questionToUpdate;

    this.preguntasService.update(
      {
        idPreguntaFrecuente: question.idPreguntaFrecuente, 
        pregunta: val.pregunta, 
        respuesta: val.respuesta
      }
    ).subscribe((resp)=> {
      console.log(resp);
      this.list();
    },(error) => {
      //error
    })
  }

  delete(){
    this.preguntasService.delete(this.questionToUpdate.idPreguntaFrecuente)
      .subscribe((resp)=>{
        console.log(resp);
        this.list();
      },(error) => {
        //error
      });
  }

  set({idPreguntaFrecuente,pregunta,respuesta, estatus}){
    this.questionToUpdate = {
      idPreguntaFrecuente : idPreguntaFrecuente,
      pregunta: pregunta,
      respuesta: respuesta,
      estatus: estatus
    }

    this.questionUpdateForm.get('pregunta').setValue(pregunta);
    this.questionUpdateForm.get('respuesta').setValue(respuesta);
  }

  rowClass(){
    return 'text-capitalize';
  }
}
