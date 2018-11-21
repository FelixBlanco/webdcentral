import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { DestacadosService } from 'src/app/services/destacados.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  list_order:any = {
    Pedido: null, EstadoPedido: null, 
    Codigo_Provincia: null, Codigo_Localidad: null,
    Nombre_Cliente: null, Nombre_Transporte: null
  }

  constructor(
    private destacadoService: DestacadosService,
    private alertService: AlertsService
  ) { }

  ngOnInit() {
    this.order();
  }

  order(){
    this.destacadoService._getOrdenes().subscribe(
      resp => {
        this.list_order = resp;
      }
    )
  }

}
