import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalesAdheridosService } from 'src/app/services/locales-adheridos.service';
import { Subscription } from 'rxjs';
import { CarouselItem } from 'src/app/services/productos.service';
import { TurnosService } from 'src/app/services/turno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertsService } from 'src/app/services/alerts.service';

import {
  NgbCalendar,

  NgbDateStruct
}from '@ng-bootstrap/ng-bootstrap'
declare var $: any;

@Component({
  selector: 'app-servicios-inicio',
  templateUrl: './servicios-inicio.component.html',
  styleUrls: ['./servicios-inicio.component.css']
})
export class ServiciosInicioComponent implements OnInit, OnDestroy {
   
  inPromise: boolean
  localesBehaviorSuscription: Subscription;
  idClasificadoBehaviorSuscription: Subscription;
  newForm: FormGroup;
  carouselItems: CarouselItem[] = [];
  checkboxList: any[];
  localesList: any[]=[];
  localesList2: any[]=[];
  idClasificado: number;
  nombreLocalSeleccionado:string;
  toSend: FormData = new FormData();
  aTimeOutFix: boolean = false;
  checkForm: FormGroup;
  rubroId:number=0;
  model: NgbDateStruct;
  time = {hour: 13, minute: 30};
  date:{year: number, month: number ,day:number};
  fecha:Date;
  constructor(
    private localesService: LocalesAdheridosService,
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private turnoService:TurnosService,
    private as:AlertsService,
  ) { 
    this.checkForm = this.fb.group({
      'rubro':(''),
     });
     this.newForm = this.fb.group({
      fk_idLocalAdherido: ['', Validators.required],
      fk_idClasificado: ['', Validators.required],
      fechaHora: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.model = this.calendar.getToday();
    this.cargarLocales();
     this.initializeBehavior();
     this.cargarCheckbox();
     this.listarLocales();
  }
  
  initializeBehavior() {

    this.localesBehaviorSuscription = this.localesService.idClasificadoSeleccionado.subscribe((val) => {
  
      if(val){
        this.idClasificado= val;
      }

    });

  }

  generateCarousel() {
    if (!this.localesList.length) {
      return;
    }

    this.carouselItems = [];
    let index: number = 1;
    this.localesList.forEach((val, i) => {
      if (this.isACarruselItem(i)) {
        this.carouselItems.push({ id: index++, items: this.getPartialItems(i, i + 4) });
      }
    });

    //Fix ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.aTimeOutFix = true, 1000); // :(
  }

  isACarruselItem($index): boolean {
    if ($index % 5) {
      return false;
    }
    return true;
  }


  getPartialItems(from, to): any[] {
    let items: any[] = [];

    this.localesList.forEach((item, i) => {
      if (i >= from && i <= to) {
        items.push(item);
      }
    });

    return items;
  }
  //parte checkbox
  cargarCheckbox() {
    this.inPromise=true;
    this.localesService.getAllClasificadosSinAuth().subscribe(
      (resp) =>{
        if(resp.ok && resp.status === 201){
          this.inPromise=false;
         this.checkboxList = resp.body.Clasificado;
        }else{
          this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');

        }
        this.inPromise = false;
      },(error) => {

        this.inPromise = false;
        this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');
      }
    )
   
  }
  cargarLocales() {
      this.localesService.getAll().subscribe(val => {
      this.localesList2 = val.body.LocalAdh;
      this.listarLocales();
      
    })
  }
  listarLocales() {
     if (this.idClasificado) {  
     let arr: Array<any> = [];
       this.localesList2.map((val, i) => {
        console.log(val);
        if (this.idClasificado == val.fk_idClasificado) {
          arr = [...arr, val];
        }
      }) 
      this.localesList=arr;
      this.generateCarousel();
    } 
  }

  checkStatus(id:any){
    
    this.idClasificado=id;
   
  }
  buscar(){
    if(this.localesList2.length){
      this.listarLocales();
    }else{
      this.cargarLocales();
    }
    
   

    
  }
  setDatos(idLocal:any,nombre:any){
    const stringFecha:string = this.model.year+"-"+this.model.month+"-"+this.model.day;//" "+this.time.hour+":"+this.time.minute+":00";
    this.nombreLocalSeleccionado=nombre;
    this.fecha= new Date(stringFecha); 
    
   
    this.toSend.append('fechaHora', this.fecha.toDateString());
    this.toSend.append('fk_idLocalAdherido', idLocal);
    this.toSend.append('fk_idClasificado', this.idClasificado.toString());
    this.toSend.append('fk_idStatusTurnos', '1');


    
   
  }
  // agregar turno a la base de datos
  addTurno(){
      this.inPromise = true;
    this.turnoService.persist(this.toSend).subscribe(
      (resp) => {
        if (resp.ok && resp.status === 201) {
          this.as.msg("OK", "Éxito", "Turno Solicitado.");
          this.newForm.reset();
          $('#nuevo').modal('hide');
        } else {
          console.error(resp);
          this.as.msg("OK", "Error", "Ha ocurrido un error interno");
        }

        this.inPromise = false;
      },
      error => {
        this.inPromise = false;
        console.log(error);
        this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    ) 
  }

  ngOnDestroy() {
  
  
    this.localesBehaviorSuscription.unsubscribe();
  }

}
