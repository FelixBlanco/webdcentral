import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoged = localStorage.getItem('sesion_login'); // variable para mostrar login
  
  constructor(){}
}
