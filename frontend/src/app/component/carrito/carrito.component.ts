import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  items: any[] = [];
  total: number;
  cantidad: number;

  constructor(private carritoService: CarritoService) { 
  }

  ngOnInit() {
    this.carritoService.carritoItems.subscribe((val)=> {
      this.items = val;
      this.setTotal();
      this.setCantidad();
    })
  }

  setTotal(){
    this.total = 0;
    if(!this.items.length){
      return;
    }

    this.items.forEach((val) => this.total += (val.cantidad * val.precio));
  }

  setCantidad(){
    this.cantidad = 0;

    if(!this.items.length){
      return;
    }

    this.items.forEach((val) => this.cantidad += val.cantidad);
  }

  incrase(id, action){
    this.carritoService.incraseOrDecraseItem(id,action);
  }

  dissmiss(id){
    this.carritoService.removeItem(id);
  }

}
