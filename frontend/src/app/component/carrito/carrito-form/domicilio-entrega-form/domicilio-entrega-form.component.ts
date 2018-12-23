import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { DomicilioEntregaService } from '../../../../services/domicilio-entrega.service';
import { UserTokenService } from '../../../../services/user-token.service';

@Component({
  selector: 'app-domicilio-entrega-form',
  templateUrl: './domicilio-entrega-form.component.html',
  styleUrls: ['./domicilio-entrega-form.component.css']
})
export class DomicilioEntregaFormComponent implements OnInit{

  @Output() onSaveDone = new EventEmitter<boolean>();

  inPromise: boolean = false;
  domicilioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private as: AlertsService,
    private domicilioEntregaService: DomicilioEntregaService,
    private userTokenService: UserTokenService
  ) { }

  ngOnInit() {
    this.domicilioForm = this.fb.group({
      domicilio: ['', Validators.required]
    });
  }

  async save(){
    this.inPromise = true;
    const idUser = this.userTokenService.getUserId();

    const respGetId = await this.domicilioEntregaService.getIdPerfilBy(idUser.toString()).toPromise();

    if(!respGetId.ok){
      this.as.msg('ERR', 'Error', 'Ha ocurrido un error al obtener el perfil del cliente');
      return
    }

    let idPefilCliente;
    if(respGetId.ok){
      if(Array.isArray(respGetId.body)){
        idPefilCliente = respGetId.body[0].idPerfilCliente;
      }else{
        this.as.msg('INFO', 'Info', 'El usuario no posee un perfil de cliente registrado');
        return;
      }
    }

    this.domicilioEntregaService.persistBy(
      {fk_idPerfilCliente: idPefilCliente, descripcion: this.domicilioForm.value.domicilio}
    ).subscribe(
      (resp) => {
        if(resp.ok){
          this.onSaveEmmitEvent();
          this.as.msg('OK', 'Éxito', 'Se ha creado el domicilio, información actualizada');
        }else{
          console.error(resp);
          this.as.msg('ERR', 'Error', 'Ha ocurrido un error al guardar los datos vuelvelo a intentar');
        }
        this.inPromise = false;
      }, error => {
        console.error(error);
        this.as.msg('ERR', 'Error', 'Ha ocurrido un error interno');
      }
    );
  }

  onSaveEmmitEvent(){
    this.onSaveDone.emit(true);
  }

}
