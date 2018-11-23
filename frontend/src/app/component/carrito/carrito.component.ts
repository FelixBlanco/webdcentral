import { Component, OnInit } from '@angular/core';
import { CarritoService, Item } from 'src/app/services/carrito.service';
import { ProductosService, Producto, PedidoHeader } from 'src/app/services/productos.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { UserTokenService } from 'src/app/services/user-token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  section: 'shipping' | 'toBuy' = 'shipping';

  items: any[] = [];
  total: number;
  cantidad: number;

  productsByOrder: any[] = [];
  aBadResponse: any[] = [];
  inPromise: boolean;
  requests: Observable<HttpResponse<Producto>>[] = [];
  itemPerCuantity: {id: number, cantidad: number}[] = [];

  token: string;

  orderForm: FormGroup;

  constructor(
    private carritoService: CarritoService, 
    private productosService: ProductosService,
    private as: AlertsService,
    private userToken: UserTokenService,
    private fb: FormBuilder
  ) { 
  }

  ngOnInit() {

    this.orderForm = this.fb.group({
      direccion: ['', Validators.required],
      codPostal: ['', [Validators.required, Validators.pattern(new RegExp(/^([A-Z]{1}\d{4}[A-Z]{3}|[A-Z]{1}\d{4}|\d{4})$/))]],
      comentario: ['']
    });

    this.userToken.token.subscribe(val => this.token = val);

    this.carritoService.orderItems.subscribe(val => this.updateItemsByOrder(val));

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

  updateItemsByOrder(val){

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
  }

  routeTo(section: 'shipping' | 'toBuy'){
    const isNotLogged = this.userToken.isNotLogged();

    if(isNotLogged && section === 'toBuy'){
      this.as.msg('INFO', 'Info', 'Debes iniciar sesión para continuar');
      $('#carrito').modal('hide');
      $('#loginModal').modal('show');
      return;
    }

    this.section = section;
  }


  createOrder(){
    const val = this.orderForm.value;
    const body = new HttpParams()
      .set("Domicilio_Entrega", val.direccion)
      .set("Codigo_Postal", val.codPostal)
      .set("comentaryClient", val.comentario)
      .set("stars", "0");
    
    const carritoItems: Item[] =  this.carritoService.getAll();
    let orderBody: any[] = []

    carritoItems.forEach(val => {
      orderBody.push({
        codeProdSys: val.id,
        Cantidad_Producto: val.cantidad,
        PrecioUnitario_Producto: val.precio,
        PorcentajeDescuento_Producto: 0,
        Numero_EncabezadoVenta: 0,
        Devolucion_Producto: 0
      });
    });

    this.inPromise = true;
    this.productosService.orderHeader(body.toString()).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        const pedidoCreated: PedidoHeader = resp.body.OB;

        this.productosService.orderBody({items: orderBody}, pedidoCreated.idOrderHeader).subscribe(resp => {
          if(resp.ok && resp.status === 201){
            this.as.msg('OK', 'Éxito', 'Se ha creado el pedido');
            this.section = 'shipping';
            this.carritoService.clear();
            this.orderForm.reset();
            
          }else{
            console.error(resp);
            this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
          }
          this.inPromise = false;
        }, error => {
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
          this.inPromise = false;
          console.error(error);
        });
        
      }else{
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        this.inPromise = false;
        console.error(resp);
      }
    }, error => {
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno')
      this.inPromise = false;
      console.error(error);
    });
  }

}
