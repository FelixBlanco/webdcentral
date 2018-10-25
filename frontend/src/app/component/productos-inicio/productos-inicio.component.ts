import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service'

@Component({
  selector: 'app-productos-inicio',
  templateUrl: './productos-inicio.component.html',
  styleUrls: ['./productos-inicio.component.css']
})

export class ProductosInicioComponent implements OnInit {

  listProductos:any;
  
  constructor(
    private _productoService: ProductosService
  ) { }

  ngOnInit() {
    this._productoService._getProductos().subscribe(
      resp => {
        console.log(resp)
        this.listProductos = resp;
        
      }
    )
  }



}
