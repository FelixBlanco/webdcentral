import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-nav-dos',
  templateUrl: './nav-dos.component.html',
  styleUrls: ['./nav-dos.component.css']
})
export class NavDosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  buscar(){ console.log("clicik")
    $("#nav-dos").css('display','none');
    $("#searchInput").css('display','block');
  }

  close_buscar(){
    $("#searchInput").css('display','none');
    $("#nav-dos").css('display','block');
  }
}
