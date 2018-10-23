import { Component } from '@angular/core';
import { ConfigHomeService } from './services/config-home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(    private _configHomeService:ConfigHomeService
    ){
      this._configHomeService._getConfigHome().subscribe(
        (resp:any) => {
          if(resp){
            document.getElementById("body").style.backgroundColor = resp.color;
          }
        }
    )
  }
}
