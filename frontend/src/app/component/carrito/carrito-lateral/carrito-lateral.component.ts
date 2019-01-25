import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito-lateral',
  templateUrl: './carrito-lateral.component.html',
  styleUrls: ['./carrito-lateral.component.css']
})
export class CarritoLateralComponent implements OnInit {

  constructor(
    private carritoService:CarritoService,
  ) {
    
   }

  ngOnInit() {
    
  }
  clearCar(){
    this.carritoService.clear();
  }

}
