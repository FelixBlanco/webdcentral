import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {GaleriaHomeService} from '../../services/galeria-home.service';
import {ProductosService} from '../../services/productos.service';
import {AlertsService} from '../../services/alerts.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

declare var $:any;

@Component({
    selector: 'app-galeria-home',
    templateUrl: './galeria-home.component.html',
    styleUrls: ['./galeria-home.component.css']
})
export class GaleriaHomeComponent implements OnInit {

    @ViewChild('table') table: any;
    @ViewChild('image') image: ElementRef;

    limit: number = 5;

    columns: any = [
      { prop: 'titulo' },
      { prop: 'nameProducto'},
      { prop: 'set_imagen'},
      { prop: 'opts'}
    ];
  
    rows: any;

    newForm: FormGroup;
    galeriaSet: any;

    inPromise: boolean;
    imgLoaded: File;

    galeriaList: any[] = [];

    productList: any[];

    constructor(
        private _galeriaHomeService: GaleriaHomeService,
        private _productosServices: ProductosService,
        private _alertService: AlertsService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.updateLists();
        this.getListProductos();
        this.newForm = this.fb.group({
            titulo: ['', Validators.required],
            fk_idProducto: [''],
            imagen: ['', Validators.required]
        });
    }

    updateLists(): void{
        this.getSlideHome();
        this.getListProductos();
    }


    getSlideHome() {
        this._galeriaHomeService._getSlideHome().subscribe(
            (resp: any) => {
                console.log('slides',resp);
                this.galeriaList = resp.producto;
                this.rows = [...this.galeriaList];
            }
        )
    }

    getListProductos() {
        this._productosServices._getProductos().subscribe(
            (resp: any) => {                
                this.productList = resp;                
            }
        )
    }


    save() {
        const values = this.newForm.value;

        let toSend: FormData = new FormData(); // Damos Formato
        toSend.append('titulo', values.titulo);
        toSend.append('imagen', this.imgLoaded, new Date().toJSON());
        toSend.append('fk_idProducto', values.fk_idProducto);

        this.inPromise = true;
        this._galeriaHomeService._addSlideHome(toSend).subscribe(
            (resp: any) => {                
                this._alertService.msg("OK", "Éxito", "Se ha guardado el registro");
                this.newForm.reset();
                this.image.nativeElement.value = '';
                this.updateLists();
                this.inPromise = false;
                $('#nuevo').modal('hide');
            },
            error => {
                this.updateLists();
                this.inPromise = false;
                console.log(error);
                this._alertService.msg("ERR", "Error", `Error: ${error.error.message}`);

                if (error.error.errors.imagen != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.imagen}`);
                }

                if (error.error.errors.titulo != null) {
                    this._alertService.msg("INFO", "Info", `Info: ${error.error.errors.titulo}`);
                }

                if (error.error.errors.fk_idProducto != null) {
                    this._alertService.msg("INFO", "Info", 'Info: El producto es requerido');
                }

            }
        )
    }

    delete() {
        this.inPromise = true;
        this._galeriaHomeService._deleteSlideHome(this.galeriaSet.idSlide).subscribe(
            resp => {
                $('#eliminar').modal('hide');
                this.updateLists();
                this._alertService.msg('OK', 'Se elimino correctamente');
                this.inPromise = false;
            },
            error => {
                console.error(error);
                this.inPromise = false;
                this.updateLists();
                this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
            }
        )
    }

    onFileChange(event) {
        if(event.target.files && event.target.files.length) {
          const fileTo: File = event.target.files[0];
    
          if(!fileTo.type.includes('image/png') 
            && !fileTo.type.includes('image/jpg') 
            && !fileTo.type.includes('image/jpeg') ){
              this._alertService.msg('ERR','Error:', 'El archivo no es admitido o no es una imagen');
              this.newForm.patchValue({
                imagen: null
              });
              return;
          }
    
          if(fileTo.size > 5000000){
            this._alertService.msg('ERR','Error:', 'El archivo es muy pesado');
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
          || (d.nameProducto.toLowerCase().indexOf(val) !== -1 || !val);
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
