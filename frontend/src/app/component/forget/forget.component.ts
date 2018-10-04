import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../../services/forget.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  constructor(
    private _forgetService:ForgetService
  ) { }

  ngOnInit() {
  }

}
