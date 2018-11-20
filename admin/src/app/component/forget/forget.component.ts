import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../../services/forget.service';
import { AlertsService } from '../../services/alerts.service';

declare var $;

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  email: any; 

  constructor(
    private _forgetService:ForgetService,
    private _alertsService:AlertsService
  ) { }

  ngOnInit() {
  }

  newForget(){
    if(this.email){
      this._forgetService._newForget({email:this.email}).subscribe(
        (resp:any) => {
          $('#forgetModal').modal('hide');
          this._alertsService.msg('OK',resp.msj);
        },
        error => {
          this._alertsService.msg('ERR','algo salio mal');
        }
      )      
    }else{
      this._alertsService.msg('ERR','Todos los campos son requeridos');
    }

  }

}
