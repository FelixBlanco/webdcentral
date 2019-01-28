import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/services/productos.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ConfigColorService } from '../../../services/config-color.service';

@Component({
  selector: 'app-productos-carousel-page',
  templateUrl: './productos-carousel-page.component.html',
  styleUrls: ['./productos-carousel-page.component.css']
})
export class ProductosCarouselPageComponent implements OnInit {
  @Input('items') items: Producto[];
  maxStar: number = 5;
  products: Producto[];
  kilogramos: Array<any> = [];
  colorTres: any; colorUno:any;
  itemToBuy: Producto;
  precio: any;
  productosAgrupados: Producto[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastr: AlertsService,
    private productsBehaviorService: ProductsBehaviorService,
    private _color: ConfigColorService    
  ) { }

  ngOnInit() {
    this.products = [...this.items]; // cargando los productos a nuevo array
    console.log(this.products);
    this.setAgrupacion();


    this._color._paletaColor().subscribe(
      (resp:any) => {
        if(resp){
          this.colorUno   = resp.colorOscuro;
          this.colorTres  = resp.colorClaro;
        }        
      }
    ); 

  }
  // funcion para order los kilos de menor a mayor , y para mostrar "KG" y "GR" en vez de "kilos" y "Gramos"
  setAgrupacion() {
    this.items.map((val, i) => {
      val.kiloProdcuto = val.kiloProdcuto.replace('Kilos', 'KG');
      val.kiloProdcuto = val.kiloProdcuto.replace('Gramos', 'GR');
      console.log(val.marca);
      val.Agrupacion= val.Agrupacion.replace(val.marca, "");
      console.log(val.Agrupacion);
      val.Valoracion_Fabricante = Number(val.Valoracion_Fabricante);
      if (val.Agrupacion.match(val.marca)) {
        console.log(val);
      }
      if (val.listAgrupacion && val.listAgrupacion.length) {
        this.productsBehaviorService.parseDefaultPrice(val.listAgrupacion).then(val => {
          // this.products[i].listAgrupacion = val;
          val.map(value => {

            let i: number = value.kiloProdcuto.search(" ");
            let str: string = value.kiloProdcuto.slice(0, i);
            if (Number(str)) {
              value.volumenToSort = Number(str);
            }
            console.log(str);
            //  debugger;
            value.kiloProdcuto = value.kiloProdcuto.replace('Kilos', 'KG');
            value.kiloProdcuto = value.kiloProdcuto.replace('Gramos', 'GR');
            value.Valoracion_Fabricante = Number(value.Valoracion_Fabricante);
            value.Agrupacion=value.Agrupacion.replace(value.marca, "");
          })
          //   console.log(this.products[i]);
          this.products[i].listAgrupacion = val.sort((a, b) => a.volumenToSort - b.volumenToSort);
        })

      }
    })
  }
  incrase(item: Producto, action): void {
    if (action) {
      item.cantidad++;
    } else {
      if (item.cantidad > 1)
        item.cantidad--;
    }
  }

  addItem(item: Producto): void {

    this.carritoService.addItem(item.codeProdSys, item.nombre, item.marca, item.cantidad, item.defaultPrice);


    this.toastr.msg("OK", "Éxito", `Se han agregado ${item.cantidad} '${item.nombre}' al carrito de compras`); item.cantidad = 1;
  }
  selectAgrupacion(i: number, j: number = null) {   // cambiando datos al producto de la  agrupacion seleccionada
    if (j != null) {
      this.products[i].nombre = this.products[i].listAgrupacion[j].nombre;
      this.products[i].defaultPrice = this.products[i].listAgrupacion[j].defaultPrice;
      this.products[i].codeProdSys = this.products[i].listAgrupacion[j].codeProdSys;
      this.products[i].urlImage = this.products[i].listAgrupacion[j].urlImage;
      this.products[i].Valoracion_Fabricante = this.products[i].listAgrupacion[j].Valoracion_Fabricante;
    }
  }

}
