import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destacado-inicio',
  templateUrl: './destacado-inicio.component.html',
  styleUrls: ['./destacado-inicio.component.css']
})
export class DestacadoInicioComponent implements OnInit {

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
