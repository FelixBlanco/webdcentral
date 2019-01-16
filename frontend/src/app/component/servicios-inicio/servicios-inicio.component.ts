import { Component, OnInit, OnDestroy ,ViewChild} from '@angular/core';
import { LocalesAdheridosService } from 'src/app/services/locales-adheridos.service';
import { Subscription } from 'rxjs';
import { CarouselItem } from 'src/app/services/productos.service';
import { TurnosService } from 'src/app/services/turno.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertsService } from 'src/app/services/alerts.service';
import { UserTokenService } from 'src/app/services/user-token.service';
import { TurnosListComponent} from './turnos-list/turnos-list.component'

import {
  NgbCalendar,
  NgbDateStruct,
  NgbTimeStruct,
  NgbTimepickerConfig
} from '@ng-bootstrap/ng-bootstrap'
declare var $: any;

@Component({
  selector: 'app-servicios-inicio',
  templateUrl: './servicios-inicio.component.html',
  styleUrls: ['./servicios-inicio.component.css'],
  providers: [NgbTimepickerConfig]
})
export class ServiciosInicioComponent implements OnInit, OnDestroy {
  @ViewChild(TurnosListComponent) turnosList: TurnosListComponent;

  inPromise: boolean;
  inPromise2:boolean;
  inPromiseAdd:boolean;
  localesBehaviorSuscription: Subscription;
 /*  idClasificadoBehaviorSuscription: Subscription; */
  newForm: FormGroup;
  carouselItems: CarouselItem[] = [];
  checkboxList: any[];
  localesList: any[] = [];
  /* localesList2: any[] = []; */
  idClasificado: number;
  nombreLocalSeleccionado: string;
  aTimeOutFix: boolean = false;
  checkForm: FormGroup;
  rubroId: number = 0;
  model: NgbDateStruct;
  time: NgbTimeStruct = { hour: 0o0, minute: 0o0, second: 0o0 };
  date: { year: number, month: number, day: number };
  /* misTurnos: Array<any> = []; */
  data;
  token;

  stringFecha;
  constructor(
    private localesService: LocalesAdheridosService,
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private turnoService: TurnosService,
    private as: AlertsService,
    private userService: UserTokenService

  ) {
    this.checkForm = this.fb.group({
      'rubro': (''),
    });
    this.newForm = this.fb.group({
      fk_idLocalAdherido: ['', Validators.required],
      fk_idClasificado: ['', Validators.required],
      fechaHora: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.model = this.calendar.getToday();
    this.userService.token.subscribe( val => this.token = val);  
    this.initializeBehavior();
    this.cargarCheckbox();


  }

  initializeBehavior() {

    this.localesBehaviorSuscription = this.localesService.idClasificadoSeleccionado.subscribe((val) => {

      if (val) {
        this.idClasificado = val;
        this.buscar();
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
  //cargar clasificados para el checkbox
  cargarCheckbox() {
    this.inPromise2 = true;
    this.localesService.getAllClasificadosSinAuth().subscribe(
      (resp) => {
        if (resp.ok && resp.status === 201) {
          this.inPromise2 = false;
          this.checkboxList = resp.body.Clasificado;
        } else {
          this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');

        }
        this.inPromise2 = false;
      }, (error) => {

        this.inPromise2= false;
        this.as.msg('ERR', 'Ha ocurrido un error interno => Clasificados');
      }
    )

  }
  // status para el checkbox  seleccionado
  checkStatus(id: any) {

    this.idClasificado = id;

  }
  // busca locales por id clasificado
  buscar() {
       this.inPromise=true;   
     this.localesService.getLocalesPorClasificados(this.idClasificado).subscribe(resp =>{
      if(resp.ok && resp.status == 201){
        this.inPromise=false;
        this.localesList = resp.body;
       
        this.generateCarousel();
        
      }else{
        this.inPromise=false;
        this.as.msg('ERR', "Error", "Ha ocurrido un error interno");
      }
    },error =>{
      this.inPromise=false;
          this.as.msg('ERR', "Error", "Ha ocurrido un error interno");
    }
    )   



     


  }
  // instancia la variable data   con los datos para agregar turno
  setDatos(idLocal: any, nombre: string) {



     let mes,dia,hora,minutos;
    
     this.model.month<10 ? mes= `0${this.model.month}`: mes= this.model.month;
     this.model.day<10 ? dia= `0${this.model.day}`: dia= this.model.day;
     this.time.hour<10 ? hora= `0${this.time.hour}`: hora= this.time.hour;
     this.time.minute<10 ? minutos= `0${this.time.minute}`: minutos= this.time.minute;
    
    if(this.token){
    //this.stringFecha = this.model.year + "-" + this.model.month + "-" + this.model.day + "T" + this.time.hour + ":" + this.time.minute + ":" + this.time.second;//" "+this.time.hour+":"+this.time.minute+":00";
      this.stringFecha =`${this.model.year}-${mes}-${dia}T${hora}:${minutos}:00Z`
    this.nombreLocalSeleccionado = nombre
   /*  const fecha = new Date(this.stringFecha);
    console.log(fecha);
    console.log(this.stringFecha); */

     this.data={
      fechaHora:this.stringFecha,
      fk_idLocalAdherido:idLocal,
      fk_idClasificado:this.idClasificado,
      fk_idStatusTurnos:1
    }
    $('#nuevoTurno').modal('show'); 


  }else{
    $('#loginModal').modal('show'); 
  }
    

  }
  // agregar turno a la base de datos
  addTurno() {


    
    this.inPromiseAdd = true;

    this.turnoService.persist(this.data).subscribe(
      (resp) => {
        if (resp.ok && resp.status === 201) {
          this.as.msg("OK", "Éxito", "Turno Solicitado.");
          this.newForm.reset();
          this.turnoService.updateSource(true);
          $('#nuevoTurno').modal('hide');
     
        } else {
          console.error(resp);
          this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
        }

        this.inPromiseAdd = false;
      },
      error => {
        this.inPromiseAdd = false;
        console.log(error);
        this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    )  
    
  }

  
  ngOnDestroy() {


    this.localesBehaviorSuscription.unsubscribe();
  }

}
