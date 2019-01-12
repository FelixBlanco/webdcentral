import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-productos-carousel-page',
  templateUrl: './productos-carousel-page.component.html',
  styleUrls: ['./productos-carousel-page.component.css']
})
export class ProductosCarouselPageComponent implements OnInit {
  @Input('items') items: Producto[];
  nombre:string='';
  listAgrupacion:Array<any>=[];
  kilogramos:Array<any>=[];
  colorTres: any;
  itemToBuy:Producto;
  precio:any ;
  constructor(
    private carritoService: CarritoService, 
    private toastr: AlertsService
  ) { }

  ngOnInit() {
    this.itemToBuy=this.items[0];
    this.precio= this.itemToBuy.defaultPrice?this.itemToBuy.defaultPrice:this.itemToBuy.precioL1; // las agrupaciones no poseen el valor default price .
    this.agrupaciones();
   }

  agrupaciones(){
    if(!this.items[0].listAgrupacion){  // si no posee agrupaciones
      this.nombre= this.items[0].nombre;
      this.kilogramos.push(this.items[0].kiloProdcuto);
    }else{ // si posee agrupaciones 
      if(this.items[0].listAgrupacion.length){
        this.listAgrupacion=[...this.items[0].listAgrupacion];
        this.nombre= this.listAgrupacion[0].nombre;
        this.listAgrupacion.map(val=>{
          this.kilogramos.push(val.kiloProdcuto);
        })
        console.log("in agrupacion");
    }
    }
  }
  incrase(item: Producto, action): void{
    if(action){
      item.cantidad++;
    }else{
      if(item.cantidad > 1)
        item.cantidad--;
    }
  }

  addItem(item: Producto): void{
    console.log(item);
   /*  this.carritoService.addItem(item.codeProdSys, item.nombre, item.marca, item.cantidad, item.defaultPrice); */
    this.carritoService.addItem(this.itemToBuy.codeProdSys, this.itemToBuy.nombre,this.itemToBuy.marca, item.cantidad, this.itemToBuy.precioL1);

   
    this.toastr.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${this.itemToBuy.nombre}' al carrito de compras`); 
    item.cantidad = 1;
  }
  kilosSelected(i:number){
    this.nombre= this.listAgrupacion[i].nombre;
    this.itemToBuy=this.listAgrupacion[i];
    this.precio= this.itemToBuy.defaultPrice?this.itemToBuy.defaultPrice:this.itemToBuy.precioL1;
    
    console.log(this.itemToBuy);
  }
}
