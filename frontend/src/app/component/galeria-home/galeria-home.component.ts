import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService } from '../../services/galeria-home.service';

@Component({
  selector: 'app-galeria-home',
  templateUrl: './galeria-home.component.html',
  styleUrls: ['./galeria-home.component.css']
})
export class GaleriaHomeComponent implements OnInit {

  new_galeria:any ={
    titulo: null
  } 

  constructor(
    private _galeriaHomeService: GaleriaHomeService
  ) { }

  ngOnInit() {
  }

  addSlideHome(){
    this._galeriaHomeService._addSlideHome(this.new_galeria).subscribe(
      resp => { console.log(resp) },
      error => { console.log( error ) }
    )
  }
}
