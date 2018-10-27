import { Injectable } from '@angular/core';

declare var toastr:any;

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  Success(msj){
    toastr.success(msj)
  }

  listError(error){
 
    var tipo=[];
		for (let i in error.errors) {
			tipo.push(i);
    }

		var errores=[];
		tipo.forEach(function(element) {
			errores.push(error.errors[element]);
    });
    
		var myError = errores;
		
    myError.forEach(function(element) {
      toastr.error(element)
    });
  }

  msjListError(myError){

  }

  Erros(msj){
    toastr.error(msj)
  }

}
