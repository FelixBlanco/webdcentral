import { Component, OnInit } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(
    // public toastr: ToastsManager, 
    //vcr: ViewContainerRef
    ) {
    //this.toastr.setRootViewContainerRef(vcr);
 }

  ngOnInit() {
  }

  showSuccess() {
    // this.toastr.success('You are awesome!', 'Success!');
  }

}
