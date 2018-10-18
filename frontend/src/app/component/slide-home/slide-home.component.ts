import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService }  from '../../services/galeria-home.service';
@Component({
  selector: 'app-slide-home',
  templateUrl: './slide-home.component.html',
  styleUrls: ['./slide-home.component.css']
})
export class SlideHomeComponent implements OnInit {

  listSlide:any;

  constructor(
    private _galeriaHomeService:GaleriaHomeService
  ) { }

  ngOnInit() {
    this.getSlide()
  }

  getSlide(){
    this._galeriaHomeService._getSlideHome().subscribe(
      (resp:any) => {
        this.listSlide = resp.producto;
        console.log(this.listSlide)
      },  
      error => {
        console.log(error);
      }
    )
  }

}
