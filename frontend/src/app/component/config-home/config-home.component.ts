import { Component, OnInit } from '@angular/core';
import { ConfigHomeService } from '../../services/config-home.service'

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})

export class ConfigHomeComponent implements OnInit {

  c_h: any = { imgLogo: null, color: null, set_logo:null }

  constructor(
    private _configHomeService:ConfigHomeService 
    ) { }

  ngOnInit() {
    this.getConfigHome();
  }

  getConfigHome(){
    this._configHomeService._getConfigHome().subscribe(
      (resp:any) => {
        console.log(resp);
        if(resp != null){
          this.c_h.imgLogo = resp.logo; 
          this.c_h.color = resp.color ;
          this.c_h.set_logo = resp.set_logo; 
        }else{
          this.c_h.imgLogo = null; 
          this.c_h.color = null;  
          this.c_h.set_logo = null;   
        }
      }
    );
  }

  upLogo(event){
    var foto_x : File = event.target.files[0]; // Ubicamos la IMG
    this.c_h.imgLogo = foto_x
  }

  upgradeConfigHome(){
    var formData: FormData = new FormData(); // Damos Formato
    formData.append('foto', this.c_h.imgLogo);
    formData.append('color', this.c_h.color)

    this._configHomeService._upgradeConfigHome(formData).subscribe(resp => {
      this.getConfigHome();
    });
  }


}
