import { Component, OnInit, ViewChild } from '@angular/core';
import { GaleryProductService } from 'src/app/services/galery-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';


export interface GaleryProduct {
  id;
  tittle;
  urlImg;
  fk_idStatusSistema;
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

  constructor(private galeryService: GaleryProductService,
    private fb: FormBuilder, private ts: AlertsService) {

    this.list();

    this.columns = [
      { prop: 'id' },
      { prop: 'tittle' },
      { prop: 'urlImg' },
      { prop: 'fk_idStatusSistema' },
      { prop: 'opts' }
    ];
  }

  ngOnInit() {
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.galeryList.filter(function(d) {
      return (d.tittle.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }

  list() {
    this.galeryService.getAll(null).subscribe((resp) => {
      if (resp.ok && resp.status === 202) {
        this.galeryList = resp.body.PFrec as Array<GaleryProduct>;
        this.rows = [...this.galeryList];
      } else {
        this.ts.listError("Ha ocurrido un error interno");
      }
    }, (error) => {
      this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
    });
  }
  save(){
    if(this.galeryForm.invalid){
      return;
    }

    const val = this.galeryForm.value;
    this.galeryService.persist({pregunta: val.pregunta, respuesta: val.respuesta}).subscribe((resp) => {
      if(resp.ok && resp.status === 201){
        this.galeryForm.get('tittle').setValue('');
        this.galeryForm.get('urlImg').setValue('');
        this.list();
        this.ts.Success("El registro se ha guardado con éxito");
      }else{
        this.ts.listError(`Ha ocurrido un error interno`);
      }
    }, (error) => {
      this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
    })
  }

  update(){
    if(this.galeryUpdateForm.invalid){
      return;
    }

    const val = this.galeryUpdateForm.value;
    const galery = this.galeryProduct;

    this.galeryService.update(
      {
        id: galery.id, 
        tittle: val.tittle, 
        urlImg: val.urlImg
      }
    ).subscribe((resp)=> {
      if(resp.ok && resp.status === 200){
        this.ts.Success("Se ha actualizado la información");
        this.list();
      }else{
        this.ts.listError(`Ha ocurrido un error interno`);
      }
      
    },(error) => {
      this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
    })
  }

  delete(){
    this.galeryService.delete(this.galeryProduct.id)
      .subscribe((resp)=>{
        if(resp.ok && resp.status === 200){
          this.ts.Success("Se ha eliminado el registro");
          this.list();
        }else{
          this.ts.listError(`Ha ocurrido un error interno`);
        }
      },(error) => {
        this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
      });
  }

  set({id,tittle,urlImg, fk_idStatusSistema}){
    this.galeryProduct = {
      id: id,
      tittle: tittle,
      urlImg: urlImg,
      fk_idStatusSistema: fk_idStatusSistema
    }

    this.galeryUpdateForm.get('tittle').setValue(tittle);
    this.galeryUpdateForm.get('urlImg').setValue(urlImg);
  }

  updateStatus(){
    const status = (this.galeryProduct.fk_idStatusSistema === 1) ? 2: 1;
    this.galeryService.updateStatus(
      {
        id: this.galeryProduct.id,
        fk_idStatusSistema: status
      }).subscribe((resp) => {
        if(resp.ok && resp.status === 200){
          this.ts.Success("Se ha actualizado el estatus");
          this.list();
        }else{
          this.ts.listError(`Ha ocurrido un error interno`);
        }
      }, (error) => {
        this.ts.listError(`Error: ${error.status} - ${error.statusText}`);
      })
  }
  rowClass(){
    return 'text-capitalize';
  }

}
