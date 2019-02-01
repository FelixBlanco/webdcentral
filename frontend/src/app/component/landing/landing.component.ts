import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  showLateralCar: boolean =false;
  constructor(
    private carritoService:CarritoService,
  ) { }

  ngOnInit() {
    this.carritoService.carritoItems.subscribe((val)=> {
      if(val.length){
       // console.log(val);
        this.showLateralCar=true;
      }else{
        this.showLateralCar=false;
      }
  
    })
  }

}
