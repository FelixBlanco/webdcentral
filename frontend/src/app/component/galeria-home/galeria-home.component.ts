import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService } from '../../services/galeria-home.service';
import { LoginService } from '../../services/login.service'
@Component({
  selector: 'app-galeria-home',
  templateUrl: './galeria-home.component.html',
  styleUrls: ['./galeria-home.component.css']
})
export class GaleriaHomeComponent implements OnInit {

  new_galeria:any ={
    titulo: null,
    fk_idProducto:null,
    imagen:null
  } 

  dataUser:any = {
    id:null, 
    userName: null,
    foto_perfil: null,
    img_perfil:null
  };

  constructor(
    private _galeriaHomeService: GaleriaHomeService,
    private _loginService: LoginService
  ) { }

  ngOnInit() {
    this.getAuthUser();
  }

  getAuthUser(){
    this._loginService._getAuthUser().subscribe(
      (resp:any) => { 
        //this.dataUser.id = resp.id;
        this.dataUser.userName = resp.userName; 
        this.dataUser.img_perfil = resp.img_perfil;
      },
      error => {
        //this.router.navigate(['']);
       }
    )
  }
  
  upImg(event){
    var foto_x : File = event.target.files[0]; // Ubicamos la IMG
    this.new_galeria.imagen = foto_x
  }

  addSlideHome(){

    const formData: FormData = new FormData(); // Damos Formato
    formData.append('titulo', this.new_galeria.titulo);
    formData.append('imagen', this.new_galeria.imagen);

    this._galeriaHomeService._addSlideHome(formData).subscribe(
      resp => { console.log(resp) },
      error => { console.log( error ) }
    )
  }
}
