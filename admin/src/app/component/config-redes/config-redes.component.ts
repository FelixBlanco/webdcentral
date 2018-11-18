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
  formRedes:any = { id_redSocial:null, facebook: null, instagram:null, twitter:null, whatsapp:null }
  isNew:boolean = true;

  constructor(
    private fb: FormBuilder,
    private alert: AlertsService,
    private configRedesService: ConfigRedesService
  ) { 

    this.myRedes = this.fb.group({
      facebook: ['',Validators.required],
      instagram: ['',Validators.required],
      twitter: ['',Validators.required],
      whatsapp: ['',Validators.required],
    })

  }

  ngOnInit() {
    this.getRedes();
  }

  getRedes(){
    this.configRedesService._getRed().subscribe(
      (resp:any) => {
        if(resp.body){
          this.isNew = false; // no es nuevo
          this.formRedes.id_redSocial = resp.body.id_redSocial
          this.formRedes.facebook = resp.body.url_face
          this.formRedes.twitter = resp.body.url_twit;
          this.formRedes.instagram = resp.body.url_inst;
          this.formRedes.whatsapp = resp.body.url_what;                  
        }else{          
          this.formRedes;
        }
      }
    )
  }

  addRedes(){
    const val: any = this.myRedes.value
    const data:any = {url_face: val.facebook, url_twit: val.twitter, url_inst: val.instagram, url_what: val.twitter} 
    this.configRedesService._addRed(data).subscribe(
      resp => {
        this.alert.msg('OK','Se agrego correctamente');
        this.getRedes();
      },
      error => {
        this.alert.msg('ERR','Algo salio mal');
      }
    )
  }

  updateRedes(){
    const val: any = this.myRedes.value
    const data:any = {url_face: val.facebook, url_twit: val.twitter, url_inst: val.instagram, url_what: val.twitter} 
    this.configRedesService._updateRed(data,this.formRedes.id_redSocial).subscribe(
      resp => {
        console.log(resp)
        this.alert.msg('OK','Se modifico correctamente');
        this.getRedes();        
      },
      error => {
        console.log(error)
        this.alert.msg('ERR','Algo salio mal');
      }
    )
  }

}
