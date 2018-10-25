import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DATATABLE_LANG } from 'src/app/models/constants/datatable-languaje.constant';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent implements OnInit {

  questions: any;
  questionForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) { 
    this.questions = this.preguntasService.getAll();
    this.questionForm =  this.fb.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required]
    });

    this.dtOptions.language = DATATABLE_LANG;
  }
  

  ngOnInit() {
  }

  save(){
    if(this.questionForm.invalid){
      console.log(this.questionForm.invalid);
      return;
    }

    const id = this.preguntasService.getLastId();
    const question = Object.assign(this.questionForm.value, {"estatus": true, "id":id})
    this.preguntasService.persist(question);
    console.log("was persisted?")
    console.table(this.preguntasService.getAll());
  }
}
