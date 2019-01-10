import { Component, OnInit } from '@angular/core';
import { ConfigRedesService } from '../../services/config-redes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-config-redes',
  templateUrl: './config-redes.component.html',
  styleUrls: ['./config-redes.component.css']
})
export class ConfigRedesComponent implements OnInit {

  myRedes : FormGroup;
  isNew:boolean = true;
  inPromise: boolean;
  r_edit:number;

  constructor(
    private fb: FormBuilder,
    private alert: AlertsService,
    private configRedesService: ConfigRedesService
  ) { 

    this.myRedes = this.fb.group({
      facebook  : ['',Validators.required],
      instagram : ['',Validators.required],
      twitter   : ['',Validators.required],
      whatsapp  : ['',Validators.required],
    })    
  }

  ngOnInit() {
    this.getRedes();
  }

  getRedes(){
    this.configRedesService._getRed().subscribe(
      (resp:any) => {        
        if(resp){                                  
          this.isNew = false; // no es nuevo
          this.r_edit = resp.id_redSocial,
          this.myRedes.setValue({            
            facebook      : resp.url_face,
            twitter       : resp.url_twit,
            instagram     : resp.url_inst,
            whatsapp      : resp.url_what
          })
        }
      }
    )
  }

  addRedes(){
    this.inPromise=true;
    const val: any = this.myRedes.value
    const data:any = {url_face: val.facebook, url_twit: val.twitter, url_inst: val.instagram, url_what: val.whatsapp} 
    this.configRedesService._addRed(data).subscribe(
      resp => {
        this.inPromise=false;
        this.alert.msg('OK','Se agrego correctamente');
        this.getRedes();
        this.isNew = false; // le decimos que ya esta creada
      },
      error => {
        this.inPromise=false;
        this.alert.msg('ERR','Algo salio mal');
      }
    )
  }

  updateRedes(){
    this.inPromise=true;
    const val: any = this.myRedes.value
    console.log(val)
    const data:any = {url_face: val.facebook, url_twit: val.twitter, url_inst: val.instagram, url_what: val.whatsapp} 
    this.configRedesService._updateRed(data,this.r_edit).subscribe(
      (resp:any) => {
        this.inPromise=false;
        this.alert.msg('OK','Se actualizo correctamente');
        this.getRedes();        
      },
      error => {
        this.inPromise=false;
       
        if(error.msj != null){
          this.alert.msg('ERR',error.msj);
        }

        if(error.message != null){
          this.alert.msg('ERR',error.message);
        }
         
      }
    )
  }

}
