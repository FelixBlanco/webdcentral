import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  items: any[] = [];
  total: number;
  cantidad: number;

  productsByOrder: any[] = [];
  aBadResponse: any[] = [];
  inPromise: boolean;
  requests: Observable<HttpResponse<Producto>>[] = [];
  itemPerCuantity: {id: number, cantidad: number}[] = [];

  constructor(
    private carritoService: CarritoService, 
    private productosService: ProductosService,
    private as: AlertsService
  ) { 
  }

  ngOnInit() {

    this.carritoService.orderItems.subscribe(val => {

      if(!val.length){
        return;
      }

      this.itemPerCuantity = [];
      this.requests = [];

      this.productsByOrder = val;
      $('#carrito').modal('toggle');

      this.productsByOrder.forEach(byOrder => {
        if(this.itemPerCuantity.filter(val => val.id === byOrder.fk_idProducto)[0]){
          this.itemPerCuantity.filter(val => val.id === byOrder.fk_idProducto)[0].cantidad += Number(byOrder.Cantidad_Producto);
        }else{
          this.itemPerCuantity.push({id: byOrder.fk_idProducto, cantidad: Number(byOrder.Cantidad_Producto)});
        }
      });

      this.itemPerCuantity.forEach(val => {
        this.requests.push(this.productosService.getById(val.id));
      })
     
      this.inPromise = true;
      forkJoin(this.requests).subscribe(resps => {
        console.log(resps);
        this.inPromise = false;
        resps.forEach( (resp) => {
          if(resp.ok && resp.status === 200){
            const actual: Producto = resp.body
            this.carritoService.addItem(actual.codeProdSys, actual.nombre, actual.marca, this.itemPerCuantity.filter((val) => val.id === actual.idProducto)[0].cantidad, actual.precioL2);
          }else if(resp.status === 404){
            this.aBadResponse.push(val);
          }else{
            console.error(resp);
            this.as.msg('ERR', 'Error', 'Ha ocurrido un error al encontrar un producto');
          }
        });
      },error => {
        console.error(error);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error al encontrar un producto');
      });
    });

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
