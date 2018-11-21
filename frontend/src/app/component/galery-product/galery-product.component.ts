import { Component, OnInit, ViewChild } from '@angular/core';
import { GaleryProductService } from 'src/app/services/galery-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';


export interface GaleryProduct {
  idGaleriaHomeProducto;
  titulo;
  imagen;
  set_imagen;
  created_at;
  updated_at;
  deleted_at;
  fk_idStatusSistema;
  statu: Status;
}

export interface Status {
  idStatusSistema;
  descripcion;
  created_a;
  updated_at;
  deleted_at;
}

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-galery-product',
  templateUrl: './galery-product.component.html',
  styleUrls: ['./galery-product.component.css']
})
export class GaleryProductComponent implements OnInit {
  @ViewChild('table') table;
  galeryList: Array<GaleryProduct>;
  rows: Array<GaleryProduct>;
  columns: any;
  galeryForm: FormGroup;
  galeryUpdateForm: FormGroup;
  limit: number = 5;
  galeryProduct: GaleryProduct;
  selectedFile: File;
  selectedImg: ImageSnippet;


  constructor(private galeryService: GaleryProductService,
    private fb: FormBuilder, private ts: AlertsService) {
    this.galeryForm = this.fb.group({
      tittle: ['', Validators.required],//Agregar validators
      imgFile: ['', Validators.required]//Agregar Validators
    });

    this.galeryUpdateForm = this.fb.group({
      tittle: ['', Validators.required],//Agregar validators
      imgFile: ['', Validators.required]//Agregar Validators
    });

    this.list();

    this.columns = [
      { prop: 'id' },
      { prop: 'tittle' },
      { prop: 'imagen' },
      { prop: 'set_imagen' },
      { prop: 'fk_idStatusSistema' },
      { prop: 'opts'}
    ];
  }

  ngOnInit() {
    
  }

  onFileChanged(ImageInput: any) {
    this.selectedFile = ImageInput.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', (event: any) => {

      this.selectedImg = new ImageSnippet(event.target.result, this.selectedFile);

      this.selectedImg.pending = false;
      this.selectedImg.status = 'ok';
    });
    reader.readAsDataURL(this.selectedFile);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.galeryList.filter(function (d) {
      return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }

  list() {
    this.galeryService.getAll(null).subscribe((resp) => {
     
      if (resp.ok && resp.status === 201) {
        
        this.galeryList = resp.body.galeria as Array<GaleryProduct>;
        this.rows = [...this.galeryList];
      } else {
        this.ts.listError("Ha ocurrido un error interno");
      }
    }, (error) => {
      this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
    });
  }
  save() {
    if (this.galeryForm.invalid) {
      return;
    }

    const val = this.galeryForm.value;
    this.galeryService.persist({ titulo: val.tittle, imagen: this.selectedFile }).subscribe((resp) => {
      if (resp.ok && resp.status === 201) {
        this.galeryForm.get('tittle').setValue('');
        this.galeryForm.get('imgFile').setValue('');
        this.list();
        this.ts.Success("El registro se ha guardado con éxito");
      } else {
        this.ts.listError(`Ha ocurrido un error interno`);
      }
    }, (error) => {
      this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
    })
  }

  delete() {
    this.galeryService.delete(this.galeryProduct.idGaleriaHomeProducto)
      .subscribe((resp) => {
        if (resp.ok && resp.status === 200) {
          this.ts.Success("Se ha eliminado el registro");
          this.list();
        } else {
          this.ts.listError(`Ha ocurrido un error interno`);
        }
      }, (error) => {
        this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
      });
  }

  set({ idGaleriaHomeProducto, tittle, imagen, set_imagen, statu, fk_idStatusSistema,
    created_at,
    updated_at,
    deleted_at,
  }) {
    this.galeryProduct = {
      idGaleriaHomeProducto: idGaleriaHomeProducto,
      titulo: tittle,
      imagen: imagen,
      set_imagen: set_imagen,
      statu: statu,
      created_at: created_at,
      updated_at: updated_at,
      deleted_at: deleted_at,
      fk_idStatusSistema: fk_idStatusSistema
    }

    this.galeryUpdateForm.get('tittle').setValue(tittle);
    this.galeryUpdateForm.get('imgFile').setValue(imagen);
  }

  rowClass() {
    return 'text-capitalize';
  }

}
