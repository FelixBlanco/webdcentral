import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { ProductosService } from 'src/app/services/productos.service';
import * as moment from 'moment';
import { CuponesService, Cupon } from 'src/app/services/cupones.service';

declare var $: any;
@Component({
  selector: 'app-cuponsapp',
  templateUrl: './cuponsapp.component.html',
  styleUrls: ['./cuponsapp.component.css']
})
export class CuponsappComponent implements OnInit {

  @ViewChild('table') table: any;
  @ViewChild('image') image: ElementRef

  limit: number;
  columns: any = [
    { prop: 'idCoupons' },
    { prop: 'fk_idProducto'},
    { prop: 'title'},
    { prop: 'description' },
    { prop: 'set_imagen' },
    { prop: 'codeCoupns' },
    { prop: 'dateExpired' }
  ];

  rows: any;
  cuponsList: Cupon[];
  productsList: any[];

  newCuponForm: FormGroup;
  cuponToUpdate: Cupon;
  cuponToUpdateForm: FormGroup;

  inPromise: boolean;

  imgLoaded: File;

  constructor(
    private fb: FormBuilder,
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
      if(resp.ok && resp.status === 201){
        this.cuponsList = resp.body.cupones;
        this.rows = [...this.cuponsList];
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
      }
    }, error => {
      console.error(error);
      this.as.msg("ERR", "Error", `Ha ocurrido un error interno`);
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

  save(){
    const value = this.newCuponForm.value;

    if(moment().format("YYYY-MM-DD") >= value.fechaExp){
      this.as.msg('INFO', 'Info:', 'La fecha de expiración no puede ser menor o igual que la actual');
      return;
    }

    let toSend = new FormData();

    toSend.set('filename', value.imagen);
    toSend.set('fk_idProducto', value.producto);
    toSend.set('title', value.titulo);
    toSend.set('description', value.descripcion);
    toSend.set('dateExpired', value.fechaExp);
    
    this.inPromise = true;
    this.cuponsService.persist(toSend).subscribe(resp => {
      if(resp.ok && resp.status === 201){
        this.inPromise = false;
        this.newCuponForm.reset();
        this.image.nativeElement.value = "";
        $('#nuevo').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha registrado el cupón');
        this.updateLists();
      }else{
        console.error(resp);
        this.inPromise = false;
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.updateLists();
    }, error => {
      console.log(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

  update(){
    const value = this.cuponToUpdateForm.value;

    if(moment().format("YYYY-MM-DD") >= value.fechaExp){
      this.as.msg('INFO', 'Info', 'La fecha de expiración no puede ser menor o igual que la actual');
      return;
    }

    let toSend = new FormData();

    toSend.append('filename', this.imgLoaded);
    toSend.append('fk_idProducto', value.producto);
    toSend.append('title', value.titulo);
    toSend.append('description', value.descripcion);
    toSend.append('dateExpired', value.fechaExp);

    this.inPromise = true;
    this.cuponsService.update(toSend, this.cuponToUpdate.idCoupons).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.inPromise = false;
        this.image.nativeElement.value = "";
        $('#modificar').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha actualizado el cupón');
        this.updateLists();
      }else{
        console.error(resp);
        this.inPromise = false;
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
      this.updateLists();
    }, error => {
      console.error(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
  }

  delete(){
    this.inPromise = true;

    this.cuponsService.delete(this.cuponToUpdate.idCoupons).subscribe((resp) => {
      if(resp.ok){
        $('#eliminar').modal('hide');
        this.as.msg('OK', 'Éxito', 'Se ha eliminado el cupón');
        this.updateLists();
      }else{
        console.error(resp);
        this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
      }
      this.inPromise = false;

    }, error => {
      console.error(error);
      this.inPromise = false;
      this.as.msg("ERR", "Error", 'Ha ocurrido un error interno');
    });
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

      this.imgLoaded = fileTo;
      this.newCuponForm.patchValue({
        imagen: fileTo
      });
    }
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.cuponsList.filter(function(d) {
      return (d.description.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.title.toLowerCase().indexOf(val) !== -1 || !val)
      || (d.description.toLowerCase().indexOf(val) !== -1 || !val);

    });

    this.rows = temp;
    this.table.offset = 0;//Requerido*/
  }

  set(row:Cupon){
    this.cuponToUpdate = row;
    this.cuponToUpdateForm.patchValue({
      titulo: row.title,
      imagen: row.imagen,
      descripcion: row.description,
      producto: row.fk_idProducto,
      fechaExp: row.dateExpired
    })
  }

  getProductName(id): string{
    return this.productsList.filter((val) => val.idProducto === id)[0].nombre;
  }

  showImage(row: Cupon){
    this.cuponToUpdate = row;
    $('#imagen').modal('toggle');
  }
}
