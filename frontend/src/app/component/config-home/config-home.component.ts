import { Component, OnInit } from '@angular/core';
import { ConfigHomeService } from '../../services/config-home.service'

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})

export class ConfigHomeComponent implements OnInit {

  imgLogo; 
  color:string; 
  
  constructor(
    private _configHomeService:ConfigHomeService 
    ) { }

  ngOnInit() {
    this.getConfigHome();
  }

  upLogo(event){
    this.imgLogo = event.target.files[0]
    console.log(<File>event.target.files[0])
  }

  getConfigHome(){
    this._configHomeService._getConfigHome().subscribe(
      resp => {
        if(resp != null){
          this.imgLogo = 'cccc'; 
          this.color = 'ccc' ; 
        }else{
          this.imgLogo = null; 
          this.color = null;   
        }
      }
    );
  }

  upgradeConfigHome(logo:any){
    console.log('Hola')
    const data:any = { logo : 'hhhh', color : "#2312312"  };
    this._configHomeService._upgradeConfigHome(data).subscribe(resp => {
      console.log(resp)
    });
  }


}
