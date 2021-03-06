import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GaleryProductService, GaleryProduct } from 'src/app/services/galery-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { MarcasService } from 'src/app/services/marcas.service';

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
  lista_marcas:any;

  columns: any = [
    { prop: 'titulo' },
    { prop: 'set_imagen'},
    { prop: 'fk_idStatusSistema'},
    { prop: 'idMarca'},
    { prop: 'opts'}
  ];

  rows: any;

  newForm: FormGroup;
  galeriaSet: GaleryProduct;
  marca:string;
  imagenMarca:string;
  inPromise: boolean;
  imgLoaded: File;

  galeriaList: GaleryProduct[] = [];

  constructor(
      private galeriaProductoService: GaleryProductService,
      private as: AlertsService,
      private fb: FormBuilder,
      private marcasServices: MarcasService
  ) { }

  ngOnInit() {
      this.getAll();
      this.getMarcas();
      
      this.newForm = this.fb.group({
          titulo:  ['', Validators.required],
          imagen:  [''],
          idMarca: ['']
      });
  }


  getAll() {
      this.galeriaProductoService.getAll().subscribe((resp) => {
            if(resp.ok){
              console.log(resp.body);
              this.galeriaList = resp.body.galeria;
              this.rows = [...this.galeriaList];
            }              
          }
      )
  }

  getMarcas(){
    this.marcasServices._getMarcas().subscribe(
      (resp:any) =>{
        this.lista_marcas = resp;
        console.log(resp);
      }
    )
  }

  save() {
      const values = this.newForm.value;
      console.log(values);
      let toSend: FormData = new FormData(); 
      toSend.append('titulo', values.titulo);
    //  toSend.append('imagen', null);
      toSend.append('idMarca', this.marca);
      toSend.append('linkImg', this.imagenMarca);

      this.inPromise = true;
      this.galeriaProductoService.persist(toSend).subscribe(
          (resp) => {
            if(resp.ok && resp.status === 201){
              console.log(resp);
              this.as.msg("OK", "Éxito", "Se ha guardado el registro");
              this.newForm.reset();
             // this.image.nativeElement.value = '';
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
  marcaSelected(){
   const val = this.newForm.get('idMarca').value;
    console.log(this.lista_marcas[val]);
    this.marca=this.lista_marcas[val].marca;
    this.imagenMarca =this.lista_marcas[val].Weblink_fabricante;
    console.log("marca: "+this.marca+"   imagenLink: "+this.imagenMarca);
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
