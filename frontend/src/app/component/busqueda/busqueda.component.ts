import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  searchValue: string;
  constructor() { }

  ngOnInit() {
  }

  search(){
    console.log('search', this.searchValue);
    $('#busquedaModal').modal('toggle');
  }

}
