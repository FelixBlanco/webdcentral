import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../../services/forget.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  email: any; 

  constructor(
    private _forgetService:ForgetService
  ) { }

  ngOnInit() {
  }

  newForget(){
    this._forgetService._newForget({email:this.email}).subscribe(
      resp => {
        console.log('enviado')
      },
      error => {
        console.log('error')
      }
    )
  }

}
