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
    var imagen_x: File = event.target.files[0];
    this.form_ofertas.imagen = imagen_x;
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
          // $("#agregarOfertaModal").modal('hide');
          // document.getElementById('#agregarOfertaModal').onclick;
          this.getOfertas();
          this.form_ofertas = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null,status: true }
          this._alertService.msg("OK", "Éxito", "Se guardó correctamente");
        },
        error => {
          this._alertService.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
        }
      )
    }

    if(x == 'upgrade'){
      formData.append('idOferta',this.form_ofertas.idOferta);
      this.ofertaServices._upgradeOferta(formData).subscribe(
        resp => {
          this.getOfertas();
          this.editOferta(this.form_ofertas.idOferta)
          $("#editarOfertaModal").modal('hide');
          this.form_ofertas = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null,status: true }
          this._alertService.msg("OK", "Éxito", "Se editó correctamente");
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
        this.form_ofertas = resp.oferta
        $("#editarOfertaModal").modal('show');
      },
      error => {
        console.log(error)
      } 
    )
  }

}
