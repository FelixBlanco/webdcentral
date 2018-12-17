import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-domicilio-entrega-form',
  templateUrl: './domicilio-entrega-form.component.html',
  styleUrls: ['./domicilio-entrega-form.component.css']
})
export class DomicilioEntregaFormComponent implements OnInit{

  @Output() onSaveDone = new EventEmitter<boolean>();

  inPromise: boolean = false;
  domicilioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: AlertsService
  ) { }

  ngOnInit() {
    this.domicilioForm = this.fb.group({
      domicilio: ['', Validators.required]
    });
  }

  save(){
    this.inPromise = true;
    //TODO
    setTimeout(() => {
      this.inPromise = false;
      this.onSaveEmmitEvent();
      this.as.msg('OK', 'Éxito', 'Se ha creado el domicilio, información actualizada')
    },3000)
  }

  onSaveEmmitEvent(){
    this.onSaveDone.emit(true);
  }

}
