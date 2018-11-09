import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas.service';
import { AlertsService  } from '../../services/alerts.service';

declare var $; 

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  listOfertas:any;
  
  form_ofertas:any = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null,status: true }

  edit_form_ofertas:any = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null,status: true }

  constructor(
    private ofertaServices: OfertasService,
    private _alertService:AlertsService
    ) { }

  ngOnInit() {
    this.getOfertas();
  }

  getOfertas(){
    this.ofertaServices._getOfertas().subscribe(
      resp => {
        this.listOfertas = resp 
      }
    )
  }

  upImagen(event){
    let imagen_x: File = event.target.files[0];
    this.form_ofertas.imagen = imagen_x;
  }

  upImagenEdit(event){
    let imagen_x: File = event.target.files[0];
    this.edit_form_ofertas.imagen = imagen_x;
  }

  add_updateOferta(x){
    var formData: FormData = new FormData();
    formData.append('imagen',this.form_ofertas.imagen);
    formData.append('titulo',this.form_ofertas.titulo);
    formData.append('tiempoExpi',this.form_ofertas.tiempoExpi);
    formData.append('status',this.form_ofertas.status);

    if(x == 'add'){   
      this.ofertaServices._addOfertas(formData).subscribe(
        resp => {
          this.getOfertas();
          this.form_ofertas = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null,status: true }
          this._alertService.msg("OK", "Éxito", "Se guardó correctamente");
          $("#agregarOfertaModal").modal('hide');
        },
        error => {
          this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
        }
      )
    }


  }

  editOferta(data:any){
    this.ofertaServices._showOferta(data.idOferta).subscribe(
      (resp:any) => {
        this.edit_form_ofertas = resp.oferta
        console.log(resp.oferta)
        $("#editarOfertaModal").modal('show');
      }
    )
  }

  upgrade(){
    
    var formData: FormData = new FormData();
    
    formData.append('imagen',this.edit_form_ofertas.imagen);
    formData.append('titulo',this.edit_form_ofertas.titulo);
    formData.append('tiempoExpi',this.edit_form_ofertas.tiempoExpi);
    formData.append('status',this.edit_form_ofertas.status);
    formData.append('idOferta',this.edit_form_ofertas.idOferta);
    
    this.ofertaServices._upgradeOferta(this.edit_form_ofertas.idOferta,formData).subscribe(
      resp => {
        this.getOfertas();
        this.editOferta(this.edit_form_ofertas.idOferta)
        $("#editarOfertaModal").modal('hide');
        this.edit_form_ofertas = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null}          
        this._alertService.msg("OK", "Éxito", "Se editó correctamente");
      },
      error => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )

  }
  

  eliminarOferta(id:number){
    this.ofertaServices._deleteOfertas(id).subscribe(
      resp => {
        this.getOfertas();
        this._alertService.msg('OK','Se elimino correctamente');
        console.log(resp)
      },
      error => {
        this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
      }
    )
  }

}
