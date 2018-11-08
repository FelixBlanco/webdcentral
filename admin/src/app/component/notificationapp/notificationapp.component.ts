import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notificationapp',
  templateUrl: './notificationapp.component.html',
  styleUrls: ['./notificationapp.component.css']
})
export class NotificationappComponent implements OnInit {

  rows: any;
  columns: any = [
    { prop: 'titulo'},
    { prop: 'descripcion'},
    { prop: 'seccionApp'}
  ]

  newNotificacionForm : FormGroup;

  limit: number;
  constructor(private fb: FormBuilder) { 
    this.limit = 5;
    this.newNotificacionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      seccionApp: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  list(){

  }

  updateFilter(event){
    /*const val = event.target.value.toLowerCase();

    const temp = this.questions.filter(function(d) {
      return (d.pregunta.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.respuesta.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  set(row){
    console.log(row);

  }

  save(){
    const value = this.newNotificacionForm.value;
    console.log('toSave', value);
  }


}
