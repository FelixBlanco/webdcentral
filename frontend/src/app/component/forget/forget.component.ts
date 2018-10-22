import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../../services/forget.service';
import { AlertsService } from '../../services/alerts.service';

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
    this._forgetService._newForget({email:this.email}).subscribe(
      (resp:any) => {
        this._alertsService.Success(resp.msj);
      },
      error => {
        if(error.status == 422){
          this._alertsService.Erros(error.error.message);
        }else{
          this._alertsService.Erros(error.error.msj);
        }
      }
    )
  }

}
