import { Component, OnInit } from '@angular/core';
import { ProductosService, Producto } from 'src/app/services/productos.service';
import { ProductsBehaviorService } from 'src/app/services/products-behavior.service';
import { ConfigColorService } from '../../services/config-color.service';

import { CarritoService, detallesCompra, Item } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserTokenService } from 'src/app/services/user-token.service';
import { forkJoin, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import * as jspdf from 'jspdf';
//import html2canvas from 'html2canvas';

declare var $
@Component({
  selector: 'app-recomprar-inicio',
  templateUrl: './recomprar-inicio.component.html',
  styleUrls: ['./recomprar-inicio.component.css']
})
export class RecomprarInicioComponent implements OnInit {
  pdfView: boolean = false;
  itemPerCuantity
  itemToShow: Item[] = [];
  newTotal :number=0;
  historialList: any[] = [];
  requests: Observable<HttpResponse<Producto>>[] = [];
  productsByOrder: any[] = [];
  aBadResponse: any[] = [];
  productsToParse: Producto[] = [];;
  inPromise: boolean = false;
  orderDetail: detallesCompra;
  colorUno :any;
  constructor(
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private as: AlertsService,
    private userToken: UserTokenService,
    private productsBehavior: ProductsBehaviorService,
    private configColor: ConfigColorService,

  ) { }

  ngOnInit() {
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorUno  = resp.colorOscuro
      }
    )
    this.setHistorial();
    setTimeout(()=> document.getElementById('recomprar').scrollIntoView({behavior: 'smooth'}),1000);
  }

  setHistorial() {
    this.inPromise= true;
    this.productosService.getUserHistory(this.userToken.getUserId().toString()).subscribe(resp => {
      if (resp.ok && resp.status === 201) {
        this.inPromise=false;
        console.log(resp.body);
        this.historialList = resp.body;
      } else {
        console.error(resp);
        console.log(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Obtener Historial de Compras');
        this.inPromise=false;

      }
    }, error => {
      this.inPromise=false;

      console.error(error);
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Obtener Historial de Compras');
    })
  }

  toPdf(row) {
    console.log(row);
    this.viewDetail(row, true);



    // Few necessary setting options 

    /*  var pageHeight = 295;
    
     var heightLeft = imgHeight; */




  }
  createPdf() {
    this.inPromise=true;
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
    let position: number = 10;
    pdf.setFont("courier", "italic");
    pdf.setFontSize(12);
    pdf.text(10, position, `PEDIDO # ${this.orderDetail.numeroPedido}`); position = position + 10;
    if (this.orderDetail.fecha) { pdf.text(10, position, `FECHA : ${this.orderDetail.fecha}`); position = position + 10; }
    pdf.text(10, position, `METODO DE ENTREGA : ${this.orderDetail.metodoEntrega}`); position = position + 10;
    pdf.text(10, position, `METODO DE PAGO : ${this.orderDetail.metodoDePago}`); position = position + 10;
    if (this.orderDetail.domicilio) { pdf.text(10, position, `DOMICILIO : ${this.orderDetail.domicilio}`); position = position + 10; }
    if (this.orderDetail.localidad) { pdf.text(10, position, `LOCALIDAD : ${this.orderDetail.localidad}`); position = position + 10; }
    if (this.orderDetail.persona_authorizada) { pdf.text(10, position, `PERSONA AUTHORIZADA : ${this.orderDetail.persona_authorizada}`); position = position + 10; }
    if (this.orderDetail.personasAutorizadaDni) { pdf.text(10, position, `IDENTIDAD PERSONA AUTHORIZADA : ${this.orderDetail.personasAutorizadaDni}`); position = position + 10; }
    if (this.orderDetail.productos) {
      position = position + 10;
      pdf.setFontType("bold");
      pdf.text(10, position, `PRODUCTO `);
      pdf.text(120, position, `PRECIO `);
      pdf.text(150, position, `CANTIDAD `);
      position = position + 10;
      pdf.setFontSize(10);
      pdf.setFont("courier", "italic");
      this.orderDetail.productos.map(val => {
        pdf.text(10, position, val.producto);
        pdf.text(120, position, val.precio.toString() + '$');
        pdf.text(150, position, val.cantidad.toString());
        position = position + 10;

      })
    }
    position = position + 10;
    pdf.setFontType("bold");
    pdf.setFontSize(18);
    pdf.text(10, position, `TOTAL : ${this.orderDetail.total}$`);




/*       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
 */      pdf.save(`Pedido${this.orderDetail.numeroPedido}.pdf`); // Generated PDF  
      this.inPromise=false;
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
  viewDetail(row, justView: boolean = false) {
    this.orderDetail = null;
    //get productos
     this.updateItemsByOrder(row, justView);
    console.log(row);
    //seteamos datos a los detalles del pedido
   
   


  }
  createDetail(row,justView){
    this.orderDetail = {
      metodoEntrega: row.metodoEntrega == '1' ? 'inMarketForm' : row.metodoEntrega == '2' ? 'delivery' : 'internalDelivery',
      metodoDePago: row.metodoPago,
      productos: this.itemToShow,
      total: this.newTotal,
      domicilio: row.Domicilio_Entrega,
      persona_authorizada: row.personasAutorizadas,
      codigo_postal: row.Codigo_Postal,
      localidad: row.localidad,
      fecha: row.fecha? row.fecha:row.fecha_retiro?row.fecha_retiro:"NO APLICA",
      disponibilidad: row.disponibilidadHr,
      personasAutorizadaDni: row.DNIautorizado,
      personasAutorizadaPasaport: row.pasarpoteAutorizado,
      pedidoRealizado: true,
      numeroPedido: row.Numero_Pedido,
      provincia:row.provincia,
      telefono:row.telefonoAutorizado,
      celular:row.celularAutorizado,
      recomprar:true,
      direccion:row.direccion
    }
    //enviamos datos al servicio para que se muestren
    if (!justView) {
      console.log('enviando desde recmprar')
     setTimeout(() => {
      this.carritoService.setDetailOrder(this.orderDetail);
     }, 1500); 
     
    }
  }
  
  // Funcion para obtener los productos
  updateItemsByOrder(row, justView: boolean) {
    const val = row.order_body;
    if (!val.length) {
      return;
    }
    console.log(val);
    this.itemPerCuantity = [];
    this.requests = [];
    this.itemToShow = [];
    this.productsToParse=[]
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
          console.log(this.productsToParse);
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
      //    console.log(data);
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
           this.newTotal=this.carritoService.getTotal(this.itemToShow); 
          this.createDetail(row,justView);
          console.log(this.newTotal);
          // crear pdf
          if (justView) {
            this.createPdf();
          }
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
  goToCar(){
    $('#carrito').modal('toggle');
  }


}
