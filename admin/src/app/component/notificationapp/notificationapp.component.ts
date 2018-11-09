import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeccionAppService } from 'src/app/services/seccion-app.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

declare var $: any;
@Component({
  selector: 'app-notificationapp',
  templateUrl: './notificationapp.component.html',
  styleUrls: ['./notificationapp.component.css']
})
export class NotificationappComponent implements OnInit {

  @ViewChild('table') table;
  rows: any;
  columns: any = [
    { prop: 'titleNotification'},
    { prop: 'descriptionNotification'},
    { prop: 'fk_idSecctionApp'}
  ]
  notifications: any[];
  newNotificacionForm : FormGroup;
  inPromise: boolean;

  limit: number;
  secciones: any[];
  constructor(
    private fb: FormBuilder, 
    private seccionAppService: SeccionAppService,
    private as: AlertsService,
    private notificationService: NotificacionesService
  ) { 
    this.limit = 5;
    this.newNotificacionForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      seccionApp: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.seccionAppService.getAll().subscribe((resp) => {
      if(resp.ok && resp.status === 202){
        this.secciones = resp.body.users;
        this.listNotifications();
      }else{
        this.as.msg('ERR','Ha ocurrido un error interno');
      }
    }, error => {
      console.log(error);
      this.as.msg('ERR','Ha ocurrido un error interno');
    })
  }

  listNotifications(){
    this.notificationService.getAll().subscribe((resp) => {
      console.log(resp);
      if(resp.ok && resp.status === 201){
        this.notifications = resp.body.notifi
        this.rows = [...this.notifications];
      }else{
        //TODO err
      }
    }, error => {
      //TODO err
      console.error(error);
    })
  }
  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.notifications.filter(function(d) {
      return (d.titleNotification.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.descriptionNotification.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  getSeccionAppById(id): {idSecctionApp: number, tag: string}{
    console.log(this.secciones.filter((value) => value.idSecctionApp === id));
    return this.secciones.filter((value) => value.idSecctionApp === id)[0] as any;
  }

  save(){
    const value = this.newNotificacionForm.value;
    this.inPromise = true;
    this.notificationService.persist(
      {
        titleNotification: value.titulo,
        descriptionNotification: value.descripcion,
        fk_idSecctionApp: value.seccionApp
      })
      .subscribe((resp)=> {
      if(resp.ok && resp.status === 201){
        this.as.msg('OK', 'Éxito', 'Notificación enviada');
        this.newNotificacionForm.reset();
        $('#nuevo').modal('hide');
      }else{
        //TODO errr
        console.error(resp);
      }
      this.listNotifications();
      this.inPromise = false;
    }, error => {
      console.error(error);
      this.inPromise = false;
      //TODO errr
    })

  }


}
