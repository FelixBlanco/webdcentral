import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService }  from '../../services/galeria-home.service';
import { ConfigColorService } from '../../services/config-color.service';

@Component({
  selector: 'app-slide-home',
  templateUrl: './slide-home.component.html',
  styleUrls: ['./slide-home.component.css']
})
export class SlideHomeComponent implements OnInit {

  listSlide:any;
  colorDos:any =  null;
  first:any[]=null;

  constructor(
    private _galeriaHomeService:GaleriaHomeService,
    private _color: ConfigColorService
  ) { }

  ngOnInit() {
    this.getSlide()

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorDos = resp.colorMedio;
        }        
      }
    );
  }

  getSlide(){
    this._galeriaHomeService._getSlideHome().subscribe(
      (resp:any) => {
        this.listSlide = resp.producto; // todo los slide        
        this.first = this.listSlide[0]; // agregamos el primero
        this.listSlide.shift(); // Eliminamos el primero de la lista
      }
    )
  }

}
