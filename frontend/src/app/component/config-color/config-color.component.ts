import { Component, OnInit } from '@angular/core';
import { ConfigColorService } from '../../services/config-color.service'

@Component({
  selector: 'app-config-color',
  templateUrl: './config-color.component.html',
  styleUrls: ['./config-color.component.css']
})
export class ConfigColorComponent implements OnInit {

  colores:any; 
  form:any = { colorOscuro: null, colorMedio:null, colorClaro: null }

  constructor(
    private _coloresServices:ConfigColorService
  ) { }

  ngOnInit() {
    this.getColores();
  }

  getColores(){
    this._coloresServices._getColor().subscribe(
      resp => {
        console.log(resp)
        this.colores = resp
      }
    )
  }

  addColores(){
    console.log('click en add')
    console.log(this.form)
    this._coloresServices.addColores(this.form).subscribe(
      resp => {
        this.getColores();
        console.log(resp)
      },
      error => {
        console.log(error);
      }
    )
  }

}
