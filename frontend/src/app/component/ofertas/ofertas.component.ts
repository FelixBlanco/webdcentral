import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../../services/ofertas.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  listOfertas:any;
  
  form_ofertas:any = { idOferta:null, titulo: null,tiempoExpi: null,imagen: null,status: true }

  constructor(
    private ofertaServices: OfertasService
  ) { }

  ngOnInit() {
    this.getOfertas();
  }

  getOfertas(){
    this.ofertaServices._getOfertas().subscribe(
      resp => {
        this.listOfertas = resp 
      },
      errors => {
        console.log(errors);
      }
    )
  }

  upImagen(event){
    var imagen_x: File = event.target.files[0];
    this.form_ofertas.imagen = imagen_x;
  }

  add_updateOferta(x){
    console.log(x)
    var formData: FormData = new FormData();
    formData.append('imagen',this.form_ofertas.imagen);
    formData.append('titulo',this.form_ofertas.titulo);
    formData.append('tiempoExpi',this.form_ofertas.tiempoExpi);
    formData.append('status',this.form_ofertas.status);

    if(x == 'add'){   
      this.ofertaServices._addOfertas(formData).subscribe(
        resp => {
          this.getOfertas();
        },
        error => {
          console.log(error)
        }
      )
    }

    if(x == 'upgrade'){
      formData.append('idOferta',this.form_ofertas.idOferta);
      this.ofertaServices._upgradeOferta(formData).subscribe(
        resp => {
          this.getOfertas();
          this.editOferta(this.form_ofertas.idOferta)
        },
        error => {
          console.log(error)
        }
      )
    }

  }

  editOferta(data:any){
    this.ofertaServices._showOferta(data.idOferta).subscribe(
      (resp:any) => {
        this.form_ofertas = resp.oferta
      },
      error => {
        console.log(error)
      } 
    )
  }

}
