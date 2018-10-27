import { Component, OnInit, ViewChild } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Question{
  id;
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
  limit: number = 5;
  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) { 
    
    this.questions = this.preguntasService.getAll();
    this.rows = [...this.questions];
    this.columns = [
      { prop: 'id'},
      { prop: 'pregunta' },
      { prop: 'respuesta' },
      { prop: 'estatus' },
      { prop: 'opts'}
    ];

    this.questionForm =  this.fb.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required]
    });
  }
  

  ngOnInit() {
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.questions.filter(function(d) {
      return (d.pregunta.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.respuesta.toLowerCase().indexOf(val) !== -1 || !val);
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
