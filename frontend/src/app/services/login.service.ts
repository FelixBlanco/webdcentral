import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  ingresarLogin(data:any){
    console.log(data);
  }

}
