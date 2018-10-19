import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from '../../services/confg-footer.service';

@Component({
  selector: 'app-config-footer',
  templateUrl: './config-footer.component.html',
  styleUrls: ['./config-footer.component.css']
})
export class ConfigFooterComponent implements OnInit {
  
  data:any = {
      direccion: null, 
      nroContacto: null, 
      email: null
    };


  constructor(
    private _confgFooterService:ConfgFooterService
  ) { }

  ngOnInit() {
    this.getConfigFooter();
    
  }

  getConfigFooter(){
    this._confgFooterService._getConfigFooter().subscribe(
      resp => { 
        this.data = resp;
      },
      error => { console.log(error) }
    )
  }

  upgradeCondigFooter(){
    this._confgFooterService._upgradeConfigFooter(this.data).subscribe(
      resp => { this.getConfigFooter();  console.log('Fino') },
      error => { console.log(error) }
    );
  }
}
