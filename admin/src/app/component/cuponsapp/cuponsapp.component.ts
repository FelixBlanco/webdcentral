import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductosService } from 'src/app/services/productos.service';
import * as moment from 'moment';
import { CuponesService } from 'src/app/services/cupones.service';

declare var $: any;
@Component({
  selector: 'app-cuponsapp',
  templateUrl: './cuponsapp.component.html',
  styleUrls: ['./cuponsapp.component.css']
})
export class CuponsappComponent implements OnInit {

  limit: number;
  columns: any = [
    { prop: 'titulo' },
    { prop: 'producto'},
    { prop: 'fechaExp'},
    { prop: 'imagen' }
  ];
  newCuponForm: FormGroup;
  cuponToUpdate: any;
  cuponToUpdateForm: FormGroup;
  rows: any;
  currentDate: string =  new Date().toLocaleDateString();
  productsList: any[];

  constructor(
    private fb: FormBuilder, 
    private cd: ChangeDetectorRef, 
    private as: AlertsService,
    private productsService: ProductosService,
    private cuponsService: CuponesService
    ) { 
    this.limit = 5;
    this.newCuponForm = this.fb.group({
      titulo: ['', Validators.required],
      imagen: [null, Validators.required],
      descripcion: ['', Validators.required],
      producto: ['', Validators.required],
      fechaExp: ['', Validators.required]
    });

    this.cuponToUpdateForm = this.fb.group({
      titulo: ['', Validators.required],
      imagen: [null, Validators.required],
      descripcion: ['', Validators.required],
      producto: ['', Validators.required],
      fechaExp: ['', Validators.required]
    });

  }

  ngOnInit() { 
    this.updateLists();
  }

  list(){
    this.cuponsService.getAll().subscribe((resp)=>{
      this.rows = []
    }, error => {
      this.as.msg("ERR", "Error", `Error listar: ${error.status} - ${error.statusText}`);
    })
  }

  listProducts(){
    this.productsService._getProductos().subscribe((data: any[])=> {
      this.productsList = data;
    });
  }

  updateLists(){
    this.listProducts();
    this.list();
  }

  updateFilter(event){
    /*const val = event.target.value.toLowerCase();

    const temp = this.questions.filter(function(d) {
      return (d.pregunta.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.respuesta.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  set(row){
    console.log(row);

  }

  save(){
    const value = this.newCuponForm.value;
    console.log(value);

    if(moment().format("YYYY-MM-DD") >= value.fechaExp){
      this.as.msg('INFO', 'Info:', 'La fecha de expiración no puede ser menor o igual que la actual');
      return;
    }

    let toSend = new FormData();

    toSend.append('filename', value.imagen);
    toSend.append('fk_idProducto', value.producto);
    toSend.append('title', value.titulo);
    toSend.append('description', value.descripcion);
    toSend.append('dateExpired', value.fechaExp);

    this.cuponsService.persist(toSend).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.as.msg('OK', 'Éxito', 'Se ha registrado con éxito');
      }else{
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
    }, error => {
      this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    });
  }

  update(){

  }

  delete(){

  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const fileTo: File = event.target.files[0];

      if(!fileTo.type.includes('image/png') 
        && !fileTo.type.includes('image/jpg') 
        && !fileTo.type.includes('image/jpeg') ){
          this.as.msg('ERR','Error:', 'El archivo no es admitido o no es una imagen');
          this.newCuponForm.patchValue({
            imagen: null
          });
          return;
      }


      if(fileTo.size > 5000000){
        this.as.msg('ERR','Error:', 'El archivo es muy pesado');
          this.newCuponForm.patchValue({
            imagen: null
          });
          return;
      }

      this.newCuponForm.patchValue({
        imagen: fileTo
      });
    }
  }
}
