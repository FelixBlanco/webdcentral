import { Injectable } from '@angular/core';

declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  Success(){
    console.log('mensaje activo')
    //toastr.success('Se creo correctamente');
  }

}
