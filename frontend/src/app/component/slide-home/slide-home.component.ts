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

  constructor(
    private _galeriaHomeService:GaleriaHomeService,
    private _color: ConfigColorService
  ) { }

  ngOnInit() {
    this.getSlide()

    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorDos = resp.colorOscuro;
        }        
      }
    );
  }

  getSlide(){
    this._galeriaHomeService._getSlideHome().subscribe(
      (resp:any) => {
        console.log(resp.producto[0])
        if(resp){
          this.listSlide = resp.producto;
        }
      }
    )
  }

}
