import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserTokenService } from 'src/app/services/user-token.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { ConfigColorService } from '../../services/config-color.service';

declare var $: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  section: 'shipping' | 'toBuy' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'detalleCompra' = 'shipping';
  colorUno :any;
  items: any[] = [];
  total: number;
  cantidad: number;
  productsByOrder: any[] = [];
  aBadResponse: any[] = [];
  inPromise: boolean;
  requests: Observable<HttpResponse<Producto>>[] = [];
  itemPerCuantity: {id: number, cantidad: number}[] = [];
  pedidoRealizado:boolean =false;
  Numero_Pedido = null;
  token: string;
  colorTres:any;

  constructor(
    private carritoService: CarritoService, 
    private productosService: ProductosService,
    private as: AlertsService,
    private userToken: UserTokenService,
    private productsBehavior: ProductsBehaviorService,
    private configColor: ConfigColorService,

  ) { }

  ngOnInit() {
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorUno  = resp.colorOscuro
        this.colorTres = resp.colorClaro
      }
    )
    this.carritoService.persistItemsCar();
    this.userToken.token.subscribe(val => this.token = val);

    this.carritoService.orderItems.subscribe(val => this.updateItemsByOrder(val));

    this.carritoService.carritoItems.subscribe((val)=> {
      this.items = val;
      this.setTotal();
      this.setCantidad();
    })
    this.carritoService.orderDetails.subscribe(val=>{
      console.log(val); 
      if(val){
      this.pedidoRealizado = val.pedidoRealizado;
      this.Numero_Pedido = val.numeroPedido; 
      this.routeTo('detalleCompra');
      $('#carrito').modal('show');

      }else{
        this.pedidoRealizado = false;
      this.Numero_Pedido = null; 
      }
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

  updateItemsByOrder(val){

    if(!val.length){
      return;
    }

    this.itemPerCuantity = [];
    this.requests = [];

    this.productsByOrder = val;
    $('#carrito').modal('toggle');

    //iteramos la lista para cachear la información de la cantidad por id de item
    this.productsByOrder.forEach(byOrder => {
      if(this.itemPerCuantity.filter(val => val.id === byOrder.fk_idProducto)[0]){//Si ya existe en el arreglo se acumula
        this.itemPerCuantity.filter(val => val.id === byOrder.fk_idProducto)[0].cantidad += Number(byOrder.Cantidad_Producto);
      }else{
        this.itemPerCuantity.push({id: byOrder.fk_idProducto, cantidad: Number(byOrder.Cantidad_Producto)});
      }
    });

    //por la items x cantidad iteramos de manera mas optima y agregamos los requests
    this.itemPerCuantity.forEach(val => {
      this.requests.push(this.productosService.getById(val.id));
    });
    
    this.inPromise = true;

    //Para setear el precio por default
    let productsToParse: Producto[] = [];

    forkJoin(this.requests).subscribe(resps => {//cuando se cumplan las promesas
      resps.forEach( (resp) => { //Iteramos todas las respuestas
        if(resp.ok && resp.status === 200){
          productsToParse.push(resp.body);//agregamos a la lista para parsear
        }else if(resp.status === 404){
          this.aBadResponse.push(val);// estas son respuestas de productos no encontrados
        }else{
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error al encontrar un producto');
        }
      });


      //parseamos los productos e iteramos para asigar finalmente al carrito de compras
      this.productsBehavior.parseDefaultPrice(productsToParse).then(
        data => {
          productsToParse = data;

          productsToParse.forEach(
            (val) =>{
              this.carritoService.addItem(
                val.codeProdSys,
                val.nombre,
                val.marca,
                this.itemPerCuantity.filter(ipc => ipc.id === val.idProducto)[0].cantidad, //retorna el valor de la cantidad almacenada en caché
                val.defaultPrice // Important
              );
            }
          );

          this.inPromise = false;

          if(this.aBadResponse.length){
            this.as.msg('INFO', 'Info', `Hubo problemas y por lo tanto no se pudo obtener información de ${this.aBadResponse.length} productos, al parecer no existen en nuestra base de datos.`)
          }
        }
      );

    },error => {
      console.error(error);
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al encontrar un producto');
    });
  }

  routeTo(section: 'shipping' | 'toBuy' | 'deliveryMethod' | 'inMarket' | 'delivery' | 'detalleCompra'){
    console.warn('actual: ',this.section, 'to', section);

    const isNotLogged = this.userToken.isNotLogged();

    if(isNotLogged && section === 'toBuy'){
      this.as.msg('INFO', 'Info', 'Debes iniciar sesión para continuar');
      $('#carrito').modal('hide');
      $('#loginModal').modal('show');
      return;
    }
   
    if(!this.carritoService.getAll().length && section === 'toBuy'){
      this.as.msg('INFO', 'Info', 'Debes agregar productos al carrito de compras');
      return
    }

    this.section = section;
  }
  resetSection(){
    $('#carrito').modal('hide');
    setTimeout(() => {
      this.section = 'shipping';
      this.carritoService.setDetailOrder(null);
    }, 1000);
    
    
  }

}
