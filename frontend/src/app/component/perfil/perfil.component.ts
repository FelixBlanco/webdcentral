import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  imgPerfil:any;

  constructor(
    private _perfilService: PerfilService
  ) { }

  ngOnInit() {
  }

  upImgPerfil(event){
    this.imgPerfil = event.target.files[0];
  }

  upgradeImgPerfil(){
    let form_data = new FormData();
    form_data.append('img_perfil', this.imgPerfil);
    //form_data.append('user_id', this.dataUser.id);

    this._perfilService._upgradePerfil(form_data).subscribe(
      resp => { console.log(resp) },
      error => { console.log(error) }
    )
  }

}
