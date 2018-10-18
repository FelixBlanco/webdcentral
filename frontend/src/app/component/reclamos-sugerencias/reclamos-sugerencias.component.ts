import { Component, OnInit } from '@angular/core';
import { ReclamosSugerenciasService } from '../../services/reclamos-sugerencias.service'

@Component({
  selector: 'app-reclamos-sugerencias',
  templateUrl: './reclamos-sugerencias.component.html',
  styleUrls: ['./reclamos-sugerencias.component.css']
})
export class ReclamosSugerenciasComponent implements OnInit {

  form:any = {titulo:null, descripcion:null};

  constructor(
    private _reclamosSugerenciasService:ReclamosSugerenciasService
  ) { }

  ngOnInit() {
  }

}
