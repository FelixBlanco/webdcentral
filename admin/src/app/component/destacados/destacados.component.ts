import { Component, OnInit } from '@angular/core';
import { DestacadosService } from '../../services/destacados.service'
import { AlertsService } from '../../services/alerts.service'
import { ProductosService } from '../../services/productos.service';

declare var $;

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css']
})

export class DestacadosComponent implements OnInit {
  
  form:any = { id_Destacado:null, descripcion:null, fk_idProducto:null };
  edit_form:any = { id_Destacado:null, descripcion:null, fk_idProducto:null };
  list_productos:any;

  lista_destacados:any;
  columns = [
    { prop: 'nameProducto' },
    { prop: 'descripcion' },
    { prop: 'opts'}
  ];

  rows: any;

  constructor(
    private destacadoService: DestacadosService,
    private alertService: AlertsService,
    private productosService: ProductosService
  ) { }

  ngOnInit() {
    this.getDestacados();
    this.productos();
  }

  productos(){
    this.productosService._getProductos().subscribe(
      resp => {
        this.list_productos = resp;
      }
    )
  }
  getDestacados(){
    this.destacadoService._getDestacados().subscribe(
      (resp:any) => {
        this.lista_destacados = resp.destacados;
        this.lista_destacados = resp.destacados;
        this.rows = [...this.lista_destacados];
      }
    )
  }

  addDestacados(){
    this.destacadoService._addDestacados(this.form).subscribe(
      resp => {
        this.alertService.msg('OK','Éxito','Se agrego Correctamente');
        this.getDestacados();
        this.form = { id_Destacado:null, descripcion:null, fk_idProducto:null };
      },
      error => {
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  editDestacado(data:any){
    $("#editar").modal('show');
    console.log(data.descripcion)
    this.edit_form.id_Destacado = data.id_Destacado;
    this.edit_form.descripcion = data.descripcion;
    this.edit_form.fk_idProducto = data.fk_idProducto;
  }
  
  upgradeDestacados(){}

  deleteDestacados(id:number){
    this.destacadoService._deleteDestacados(id).subscribe(
      resp => {
        this.alertService.msg('OK','Éxito','Se agrego Correctamente');
        this.getDestacados();
      },
      error =>{
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

}
