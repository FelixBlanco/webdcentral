import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../../services/forget.service';
import { AlertsService } from '../../services/alerts.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

declare var $;

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  myForm: FormGroup;  

  constructor(
    private _forgetService:ForgetService,
    private _alertsService:AlertsService,
    private fb:FormBuilder
  ) { 
    this.myForm = this.fb.group({
      'email' : ['',Validators.required]
    })
  }

  ngOnInit() {
  }

  newForget(){    
    this._forgetService._newForget({email:this.myForm.value.email}).subscribe(
      (resp:any) => {
        $('#forgetModal').modal('hide');
        this._alertsService.msg('OK',resp.msj);
      },
      error => {
        this._alertsService.msg('ERR','algo salio mal');
      }
    )      
  }

}
