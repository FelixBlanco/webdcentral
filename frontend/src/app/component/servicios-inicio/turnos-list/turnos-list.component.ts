import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turno.service';
import { UserTokenService } from 'src/app/services/user-token.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ClasificadosService } from 'src/app/services/clasificados.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.css']
})

export class TurnosListComponent implements OnInit {
  miTabla: Array<any> = []
  misTurnos: Array<any> = [];
  userId: number;
  modelData: any;
  inPromise: boolean;

  inPromise2: boolean;


  token;
  turnoNewBehaviorSuscription: Subscription;
  data;
  constructor(
    private turnosService: TurnosService,
    private userService: UserTokenService,
    private clasService: ClasificadosService,
    private as: AlertsService
  ) {

  }

  ngOnInit() {

   // this.getTurnosUser();
    
    this.userService.token.subscribe(val=>{
      if(!val){
        this.misTurnos=[];
        console.log(val);
      }else{
<<<<<<< HEAD
        setTimeout(() => this.initializeBehavior(), 3000)
=======
        setTimeout(() => this.initializeBehavior(), 2500)
>>>>>>> 246f8290de33645f50a4a171a96ee4a427100564
       // this.initializeBehavior();
      }
    })

  }
  initializeBehavior() {

    this.turnoNewBehaviorSuscription = this.turnosService.isNewAdded.subscribe((val) => { 
        this.getTurnosUser()
    })
  }
  cancelarDatos(turno:any){
    this.data = {
     
      "idTurnos": turno.id,
      "fk_idStatusTurnos":2,
    }
  }
  cancelarStatus(){

    this.inPromise2 = true;
     this.turnosService.updateStatus(this.data).subscribe(
      resp=>{
        this.inPromise2 = false;
 
            this.getTurnosUser();
            this.as.msg("OK","Turno cancelado");
            $("#cancelarTurno").modal("hide");
      }
    ) 
  }
  getTurnosUser() {
    this.misTurnos=[];
    this.userId = this.userService.getUserId();
    this.inPromise = true;
    this.turnosService.getTurnos(null).subscribe(
      resp => {
        if (resp.ok && resp.status == 201) {

          resp.body.turnos.map((val) => {

            if (val.fk_idUser == this.userId) {
               console.log(resp.body);
              this.modelData = {
                "rubro": val.clasificado.titulo,
                "id": val.idTurnos,
                "fecha": val.fechaHora,
                "status": val.fk_idStatusTurnos,
                "local":val.local_adherido.nombre
              }
              this.misTurnos = [...this.misTurnos, this.modelData];
            
            }

          })

        } else {
          console.log("error")
        }
        this.inPromise = false;
      }, error => {
        this.inPromise = false;
        console.log(error)
      }
    )


  }


}  
