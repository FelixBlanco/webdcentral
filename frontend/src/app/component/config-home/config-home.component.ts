import { Component, OnInit } from '@angular/core';
import { ConfigHomeService } from '../../services/config-home.service'

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})

export class ConfigHomeComponent implements OnInit {

  constructor(
    private _configHomeService:ConfigHomeService 
    ) { }

  ngOnInit() {
  }

}
