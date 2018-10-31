import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  rows: any[] = [];
  columns = [
    { prop: 'producto' },
    { prop: 'descripcion' },
    { prop: 'precio' },
    { prop: 'cantidad'},
    { prop: 'total' }
  ];

  constructor(private carritoService: CarritoService) { 
  }

  ngOnInit() {
    this.carritoService.carritoItems.subscribe((val)=> {
      this.rows = val;
    })

    this.carritoService.removeItem(null);
  }

  incrase(id, action){
    this.carritoService.incraseOrDecraseItem(id,action);
  }

}
