import { Component, OnInit, ViewChild } from '@angular/core';
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
  
  @ViewChild('table') table;

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
  limit = 10;
  inPromise:boolean;
  idEliminar:number = null;
  
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
        this.rows = [...this.lista_destacados];
      }
    )
  }

  addDestacados(){
    this.inPromise = true;
    this.destacadoService._addDestacados(this.form).subscribe(
      resp => {
        this.alertService.msg('OK','Éxito','Se agrego Correctamente');
        this.getDestacados();
        this.form = { id_Destacado:null, descripcion:null, fk_idProducto:null };
        this.inPromise = false;
      },
      error => {
        this.inPromise = false;
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  editDestacado(data:any){
    $("#editar").modal('show');
    this.edit_form.id_Destacado = data.id_Destacado;
    this.edit_form.descripcion = data.descripcion;
    this.edit_form.fk_idProducto = data.fk_idProducto;    
  }

  upgradeDestacado(){
    this.inPromise = true;
    this.destacadoService._editDestacados(this.edit_form.id_Destacado, this.edit_form).subscribe(
      resp => {
        this.inPromise = false;
        this.alertService.msg('OK','Éxito','Se edito correctamente');
        this.getDestacados();
      },
      error => {
        this.inPromise = false;
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  modalEliminar(id:number){
    this.idEliminar = id;
    $("#eliminar").modal('show');
  }

  deleteDestacados(){
    this.inPromise = true;
    const idEliminar:number = this.idEliminar; 
    this.destacadoService._deleteDestacados(idEliminar).subscribe(
      resp => {
        this.alertService.msg('OK','Éxito','Se elimino correctamente');
        this.getDestacados();
        this.inPromise = false;
      },
      error =>{
        this.inPromise = false;
        this.alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.lista_destacados.filter(function(d) {
      return (d.descripcion.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.nameProducto.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }

}
