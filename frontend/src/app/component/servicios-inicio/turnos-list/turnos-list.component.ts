import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turno.service';
import { UserTokenService } from 'src/app/services/user-token.service';
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
  token;
  turnoNewBehaviorSuscription: Subscription;
  constructor(
    private turnosService: TurnosService,
    private userService: UserTokenService,
    private clasService: ClasificadosService
  ) {

  }

  ngOnInit() {

   // this.getTurnosUser();
    
    this.userService.token.subscribe(val=>{
      if(!val){
        this.misTurnos=[];
        console.log(val);
      }else{
        setTimeout(() => this.initializeBehavior(), 2500)
       // this.initializeBehavior();
      }
    })

  }
  initializeBehavior() {

    this.turnoNewBehaviorSuscription = this.turnosService.isNewAdded.subscribe((val) => { 
        this.getTurnosUser()
    })
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
              this.modelData = {
                "rubro": val.clasificado.titulo,
                "id": val.idTurnos,
                "fecha": val.fechaHora,
                "status": val.fk_idStatusTurnos
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
