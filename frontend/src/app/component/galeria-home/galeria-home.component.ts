import { Component, OnInit } from '@angular/core';
import { GaleriaHomeService } from '../../services/galeria-home.service';
import { LoginService } from '../../services/login.service'
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  })
};
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

  list_galeria:any;

  constructor(
    private http:HttpClient,
    private _galeriaHomeService: GaleriaHomeService,
  ) { }

  ngOnInit() {
    this.getSlideHome();
  }
  

  getSlideHome(){
    this._galeriaHomeService._getSlideHome().subscribe(
      (resp:any) => {
        this.list_galeria = resp.producto;

      },
      error => {
        console.log(error)
      }
    )
  }

  upImg(event){
    var foto_x : File = event.target.files[0]; // Ubicamos la IMG
    this.new_galeria.imagen = foto_x
  }

  addSlideHome(){

    var galeriaHome: FormData = new FormData(); // Damos Formato
    galeriaHome.append('titulo', this.new_galeria.titulo);
    galeriaHome.append('imagen', this.new_galeria.imagen);

    return this.http.post('http://localhost:8000/api/auth/createSlides',galeriaHome,{
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer'+localStorage.getItem('access_token'),
      })
    }).subscribe(
      (resp:any) => { console.log(resp.msj) },
      error => { console.log( error ) }
    )
  }
}
