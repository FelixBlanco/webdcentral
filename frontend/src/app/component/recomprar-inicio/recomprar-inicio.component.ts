import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';

import { CarritoService, detallesCompra, Item } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserTokenService } from 'src/app/services/user-token.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
declare var $
@Component({
  selector: 'app-recomprar-inicio',
  templateUrl: './recomprar-inicio.component.html',
  styleUrls: ['./recomprar-inicio.component.css']
})
export class RecomprarInicioComponent implements OnInit {

  itemPerCuantity
  itemToShow: Item[] =[];
  historialList: any[] = [];
  requests: Observable<HttpResponse<Producto>>[] = [];
  productsByOrder: any[] = [];
  aBadResponse: any[] = [];
  productsToParse: Producto[] = [];;
  inPromise: boolean = false;
  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private as: AlertsService,
    private userToken: UserTokenService,
    private productsBehavior: ProductsBehaviorService
  ) { }

  ngOnInit() {
    this.setHistorial();
  }

  setHistorial() {

    this.productosService.getUserHistory(this.userToken.getUserId().toString()).subscribe(resp => {
      if (resp.ok && resp.status === 201) {
        console.log(resp.body);
        this.historialList = resp.body;
      } else {
        console.error(resp);
        console.log(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Obtener Historial de Compras');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Obtener Historial de Compras');
    })
  }

  toPdf(row) {
    console.log(row);
  }

  toRebuy(row) {
    console.log(row);
    if (!row.order_body.length) {
      this.as.msg('INFO', 'Info', 'Disculpe esta compra no tiene productos asociados.');
      return;
    }
    this.carritoService.setProductsOrder(row.order_body);
    this.carritoService.carritoItems.subscribe(() => this.setHistorial());

  }
  viewDetail(row) {
    //get productos
    this.updateItemsByOrder(row.order_body);
    console.log(row);

    //seteamos datos a los detalles del pedido
    let detailOrder: detallesCompra = {
      metodoEntrega: row.metodoEntrega == '1' ?'inMarketForm':  row.metodoEntrega == '2' ? 'delivery' :'internalDelivery',
      metodoDePago: row.metodoPago,
      productos: this.itemToShow,
      total: row.monto_total,
      domicilio: row.Domicilio_Entrega,
      persona_authorizada: row.personasAutorizadas,
      codigo_postal: row.Codigo_Postal,
      localidad: row.localidad,
      fecha: row.fecha,
      disponibilidad: row.disponibilidadHr,
      personasAutorizadaDni: row.DNIautorizado,
      personasAutorizadaPasaport: row.DNIautorizado,
      pedidoRealizado: true,
      numeroPedido: row.Numero_Pedido
    }
    //enviamos datos al servicio para que se muestren
    this.carritoService.setDetailOrder(detailOrder);
    $('#carrito').modal('toggle');

  }
  // Funcion para obtener los productos
  updateItemsByOrder(val) {

    if (!val.length) {
      return;
    }
    console.log(val);
    this.itemPerCuantity = [];
    this.requests = [];

    this.productsByOrder = val;
    /* $('#carrito').modal('toggle'); */

    //iteramos la lista para cachear la información de la cantidad por id de item
    this.productsByOrder.forEach(byOrder => {
      if (this.itemPerCuantity.filter(val => val.id === byOrder.fk_idProducto)[0]) {//Si ya existe en el arreglo se acumula
        this.itemPerCuantity.filter(val => val.id === byOrder.fk_idProducto)[0].cantidad += Number(byOrder.Cantidad_Producto);
      } else {
        this.itemPerCuantity.push({ id: byOrder.fk_idProducto, cantidad: Number(byOrder.Cantidad_Producto) });
      }
    });

    //por la items x cantidad iteramos de manera mas optima y agregamos los requests
    this.itemPerCuantity.forEach(val => {
      this.requests.push(this.productosService.getById(val.id));
    });

    this.inPromise = true;

    //Para setear el precio por default


    forkJoin(this.requests).subscribe(resps => {//cuando se cumplan las promesas
      resps.forEach((resp) => { //Iteramos todas las respuestas
        if (resp.ok && resp.status === 200) {
          this.productsToParse.push(resp.body);//agregamos a la lista para parsear
        } else if (resp.status === 404) {
          this.aBadResponse.push(val);// estas son respuestas de productos no encontrados
        } else {
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error al encontrar un producto');
        }
      });


      //parseamos los productos e iteramos para asigar finalmente al carrito de compras
      this.productsBehavior.parseDefaultPrice(this.productsToParse).then(
        data => {
          this.productsToParse = data;
          console.log(data);
          this.productsToParse.forEach(
            (val) => {
              let id = val.codeProdSys;
              let producto = val.nombre;
              let precio = Number(val.defaultPrice);
              let cantidad = this.itemPerCuantity.filter(ipc => ipc.id === val.idProducto)[0].cantidad;
              let marca = val.marca
              let added: Item = {
                id: id,
                producto: producto,
                marca: marca,
                precio: precio,
                cantidad: cantidad
              }
              console.log(added);
              this.itemToShow.push(added);
              /*  this.carritoService.addItem(
                 val.codeProdSys,
                 val.nombre,
                 val.marca,
                 this.itemPerCuantity.filter(ipc => ipc.id === val.idProducto)[0].cantidad, //retorna el valor de la cantidad almacenada en caché
                 val.defaultPrice // Important
               ); */
            }
          );

          this.inPromise = false;

          if (this.aBadResponse.length) {
            this.as.msg('INFO', 'Info', `Hubo problemas y por lo tanto no se pudo obtener información de ${this.aBadResponse.length} productos, al parecer no existen en nuestra base de datos.`)
          }
        }
      );

    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al encontrar un producto');
    });
  }


}
