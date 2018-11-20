import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserTokenService } from 'src/app/services/user-token.service';

@Component({
  selector: 'app-recomprar-inicio',
  templateUrl: './recomprar-inicio.component.html',
  styleUrls: ['./recomprar-inicio.component.css']
})
export class RecomprarInicioComponent implements OnInit {


  historialList: any[] = [];
  constructor(
    private productosService: ProductosService, 
    private carritoService: CarritoService,
    private as: AlertsService,
    private userToken: UserTokenService
  ) { }

  ngOnInit() {
    this.setHistorial();
  }

  setHistorial(){

    this.productosService.getUserHistory(this.userToken.getUserId().toString()).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.historialList = resp.body;
      }else{
        console.error(resp);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Obtener Historial de Compras');
      }
    }, error => {
      console.error(error);
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno => Obtener Historial de Compras');
    })
  }

  toPdf(row){
    console.log(row);
  }

  toRebuy(row){
    if(!row.order_body.length){
      this.as.msg('INFO', 'Info', 'Disculpe esta compra no tiene productos asociados.');
      return;
    }
    this.carritoService.setProductsOrder(row.order_body);
    this.carritoService.carritoItems.subscribe(() => this.setHistorial());

  }
}
