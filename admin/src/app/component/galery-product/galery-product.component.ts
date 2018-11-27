import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GaleryProductService, GaleryProduct } from 'src/app/services/galery-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

declare var $:any;


@Component({
  selector: 'app-galery-product',
  templateUrl: './galery-product.component.html',
  styleUrls: ['./galery-product.component.css']
})
export class GaleryProductComponent implements OnInit {
  
  @ViewChild('table') table: any;
  @ViewChild('image') image: ElementRef;

  limit: number = 5;

  columns: any = [
    { prop: 'titulo' },
    { prop: 'set_imagen'},
    { prop: 'fk_idStatusSistema'},
    { prop: 'opts'}
  ];

  rows: any;

  newForm: FormGroup;
  galeriaSet: GaleryProduct;

  inPromise: boolean;
  imgLoaded: File;

  galeriaList: GaleryProduct[] = [];

  constructor(
      private galeriaProductoService: GaleryProductService,
      private as: AlertsService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
      this.getAll();

      this.newForm = this.fb.group({
          titulo: ['', Validators.required],
          imagen: ['', Validators.required]
      });
  }


  getAll() {
      this.galeriaProductoService.getAll().subscribe((resp) => {
            if(resp.ok){
              this.galeriaList = resp.body.galeria;
              this.rows = [...this.galeriaList];
            }              
          }
      )
  }



  save() {
      const values = this.newForm.value;

      let toSend: FormData = new FormData(); 
      toSend.append('titulo', values.titulo);
      toSend.append('imagen', this.imgLoaded, new Date().toJSON());

      this.inPromise = true;
      this.galeriaProductoService.persist(toSend).subscribe(
          (resp) => {
            if(resp.ok && resp.status === 201){
              this.as.msg("OK", "Éxito", "Se ha guardado el registro");
              this.newForm.reset();
              this.image.nativeElement.value = '';
              $('#nuevo').modal('hide');
            }else{
              console.error(resp);
              this.as.msg("OK", "Error", "Ha ocurrido un error interno");
            }
            this.getAll();
            this.inPromise = false;
          },
          error => {
            this.getAll();
            this.inPromise = false;
            console.log(error);
            this.as.msg("ERR", "Error", "Ha ocurrido un error interno");
          }
      )
  }

  delete() {
      this.inPromise = true;
      this.galeriaProductoService.delete(this.galeriaSet.idGaleriaHomeProducto).subscribe(
          resp => {
            console.log(resp);
            if(resp.ok && resp.status === 200){
              $('#eliminar').modal('hide');
              this.as.msg('OK','Éxito' ,'Se elimino correctamente');
              
            }else{
              console.error(resp);
              this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
            }
            this.getAll();
            this.inPromise = false;
          },
          error => {
              console.error(error);
              this.inPromise = false;
              this.getAll();
              this.as.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
          }
      )
  }

  updateStatus(){
    this.inPromise = true;

    const status: number =  this.galeriaSet.fk_idStatusSistema === 1 ? 0: 1;

    this.galeriaProductoService.updateStatus(this.galeriaSet.idGaleriaHomeProducto, status).subscribe(
      resp => {
        if(resp.ok && resp.status === 201){
          $('#estatus').modal('hide');
          this.as.msg('OK', 'Éxito', 'Se ha actualizado el estatus');
        }else{
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
        }
        this.getAll();
        this.inPromise = false;
      },error => {
        this.inPromise = false;
        console.error(error);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      });
  }

  onFileChange(event) {
      if(event.target.files && event.target.files.length) {
        const fileTo: File = event.target.files[0];
  
        if(!fileTo.type.includes('image/png') 
          && !fileTo.type.includes('image/jpg') 
          && !fileTo.type.includes('image/jpeg') ){
            this.as.msg('ERR','Error:', 'El archivo no es admitido o no es una imagen');
            this.newForm.patchValue({
              imagen: null
            });
            return;
        }
  
        if(fileTo.size > 5000000){
          this.as.msg('ERR','Error:', 'El archivo es muy pesado');
            this.newForm.patchValue({
              imagen: null
            });
            return;
        }
  
        this.imgLoaded = fileTo;
        this.newForm.patchValue({
          imagen: fileTo
        });
      }
  }

  updateFilter(event){
      const val = event.target.value.toLowerCase();
  
      const temp = this.galeriaList.filter(function(d) {
        return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val)
      });
  
      this.rows = temp;
      this.table.offset = 0;//Requerido*/
  }

  showImage(row: any){
      this.galeriaSet = row;
      $('#imagen').modal('toggle');
  }

  set(row: any){
      this.galeriaSet = row;
  }

}
