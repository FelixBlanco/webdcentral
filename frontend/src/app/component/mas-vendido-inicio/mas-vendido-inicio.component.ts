import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mas-vendido-inicio',
  templateUrl: './mas-vendido-inicio.component.html',
  styleUrls: ['./mas-vendido-inicio.component.css']
})
export class MasVendidoInicioComponent implements OnInit {

  counts:any ={
    uno: { count: 1 },
    dos: { count: 1 },
    tres: { count: 1 },
    cuatro: { count: 1 },
    cinco: { count: 1 },
    seis: { count: 1 },
    siete: { count: 1 },
    ocho: { count: 1 },
  }

  constructor() { }

  ngOnInit() {

  }


  mas(p:string){
    this.counts[p].count++;
  }

  menos(p:string){
    if(this.counts[p].count != 0){
      this.counts[p].count--;
    }
  }

}
