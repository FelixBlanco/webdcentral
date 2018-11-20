import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import { DestacadosService } from 'src/app/services/destacados.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  list_order:any

  constructor(
    private destacadoService: DestacadosService,
    private alertService: AlertsService
  ) { }

  ngOnInit() {
    this.order();
  }

  order(){
    this.destacadoService._getOrder().subscribe(
      resp => {
        this.list_order = resp;
      }
    )
  }

}
