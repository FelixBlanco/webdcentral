import { Component, OnInit } from '@angular/core';
import { LocalesAdheridosService } from '../../services/locales-adheridos.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-locales-adheridos',
  templateUrl: './locales-adheridos.component.html',
  styleUrls: ['./locales-adheridos.component.css']
})
export class LocalesAdheridosComponent implements OnInit {

  myForm: FormGroup;
  foto_1:File; foto_2:File;

  constructor(
    private localesAdheridosServices: LocalesAdheridosService,
    private fb: FormBuilder
  ) { 
    this.myForm = this.fb.group({
      'nombre'      : ['',Validators.required],
      'descripcion' : ['',Validators.required],
      'foto_1'      : ['',Validators.required],
      'foto_2'      : ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  changeFoto(event,q_foto){
    
    if(q_foto == 1){
      this.foto_1 = event.target.files[0];
    }

    if(q_foto == 2){
      this.foto_2 = event.target.files[0];
    }
  
  }

  save(){
    const val = this.myForm.value;
    const formData = new FormData();
    formData.append('nombre', val.nombre)
    formData.append('descripcion', val.descripcion)
    formData.append('foto_1', this.foto_1)
    formData.append('foto_2', this.foto_2)

    this.localesAdheridosServices.saveLocalAdherido(formData).subscribe(
      resp => {
        console.log(resp)
      },
      error => {
        console.log(error)
      }
    )

  }
}
