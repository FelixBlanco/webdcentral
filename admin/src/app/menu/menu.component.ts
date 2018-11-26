import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  dataUser:any ={ userName: localStorage.getItem('userName'), img_perfil:localStorage.getItem('img_perfil') } 

  constructor() { }

  ngOnInit() {
  }

}
