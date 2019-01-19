import { Component, OnInit } from '@angular/core';
import { ConfgFooterService } from 'src/app/services/confg-footer.service';

@Component({
  selector: 'app-baja-app-inicio',
  templateUrl: './baja-app-inicio.component.html',
  styleUrls: ['./baja-app-inicio.component.css']
})
export class BajaAppInicioComponent implements OnInit {
  
  google_play: any;
  app_store: any;

  constructor(private configFooterServices:ConfgFooterService) { 
    this.configFooterServices._getConfigFooter().subscribe(
      (resp:any) => {
        this.google_play = resp.url_google_play;
        this.app_store = resp.url_app_store;
    })
  }
  
  ngOnInit() {
  }

}
