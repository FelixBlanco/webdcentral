import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { DestacadosService } from 'src/app/services/destacados.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  aux:boolean = false;
  list_order: any = {
    Pedido: null, EstadoPedido: null,
    Codigo_Provincia: null, Codigo_Localidad: null,
    Nombre_Cliente: null, Nombre_Transporte: null
  }
  list_orderSearch: any = {
    Pedido: null, EstadoPedido: null,
    Codigo_Provincia: null, Codigo_Localidad: null,
    Nombre_Cliente: null, Nombre_Transporte: null
  }
  searchCode:string="";
  constructor(
    private destacadoService: DestacadosService,
    private alertService: AlertsService
  ) { }

  ngOnInit() {
    this.order();
  }

  order() {
    this.destacadoService._getOrdenes2().subscribe(
      resp => {
        console.log(resp);
        if (resp.ok ) {
          
          this.list_order = resp.body;
          this.list_orderSearch = resp.body;
          this.aux = true;
        }else{
          this.alertService.msg('ERR','Fail',resp.statusText);
          this.aux=false;
        }
      },error=>{
        console.log(error);
        this.alertService.msg('ERR','Fail',error);
        this.aux=false;
      }
    )
  }
  search(){
    this.list_orderSearch=[];
  
    if(this.searchCode.length &&this.list_order.length){
      this.list_order.map(val=>{
          if(val.Pedido.match(this.searchCode)){
           // console.log(val.Pedido);
            this.list_orderSearch.push(val);
          }
      })
    }else {
      this.list_orderSearch = this.list_order;

    }
    console.log(this.list_orderSearch.length);

  }

}
