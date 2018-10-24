import { Component, OnInit } from '@angular/core';
import { ConfigHomeService } from '../../services/config-home.service'
import { AlertsService } from '../../services/alerts.service'

declare var toastr;

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})

export class ConfigHomeComponent implements OnInit {

  c_h: any = { imgLogo: null, color: null, set_logo:null }

  constructor(
    private _configHomeService:ConfigHomeService,
    private _alertService: AlertsService
    ) { }

  ngOnInit() {
    this.getConfigHome();
  }

  getConfigHome(){
    this._configHomeService._getConfigHome().subscribe(
      (resp:any) => {
        if(resp){
          this.c_h.imgLogo = resp.logo; 
          this.c_h.color = resp.color ;
          this.c_h.set_logo = resp.set_logo; 
        }
      }
    );
  }

  upLogo(event){
    var foto_x : File = event.target.files[0]; // Ubicamos la IMG
    this.c_h.imgLogo = foto_x
  }

  upgradeConfigHome(){
    
    if(this.c_h.color == '' && this.c_h.logo == ''){
      this._alertService.Success('todos los campos son rqueridos')
    }else{
      var formData: FormData = new FormData(); // Damos Formato
      formData.append('logo', this.c_h.imgLogo);
      formData.append('color', this.c_h.color)
  
      this._configHomeService._upgradeConfigHome(formData).subscribe((resp:any) => {
        this.getConfigHome();
        document.getElementById("body").style.backgroundColor = resp.color;
        this._alertService.Success('Actualizacion completada');
      },
      error => {
        this._alertService.listError(error.error);
      });  
    }
    
  }
}
