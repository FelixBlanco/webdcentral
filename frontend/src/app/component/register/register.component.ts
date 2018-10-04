import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _registerService:RegisterService
  ) { }

  ngOnInit() {
  }

}
