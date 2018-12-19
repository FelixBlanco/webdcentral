import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turno.service';
import { UserTokenService } from 'src/app/services/user-token.service';
import { ClasificadosService } from 'src/app/services/clasificados.service';

declare var $: any;

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.css']
})

export class TurnosListComponent implements OnInit {
  miTabla: Array<any>=[]
  misTurnos: Array<any> = [];
  userId: number;
  modelData:any;
  index:number=0;
  inPromise:boolean;
  
  constructor(
    private turnosService: TurnosService,
    private userService: UserTokenService,
    private clasService: ClasificadosService
  ) {

  }

  ngOnInit() {
    this.getTurnosUser();


 
  }
  getTurnosUser() {
    this.userId = this.userService.getUserId();
    this.inPromise=true;
    this.turnosService.getTurnos(null).subscribe(
      resp => {
       // this.inPromise=false;
        if (resp.ok && resp.status == 201) {

          resp.body.turnos.map((val) => {
            
            if (val.fk_idUser == this.userId) {      
                  this.modelData = {
                    "rubro":"",
                    "id":val.idTurnos,
                    "fecha":val.fechaHora,
                    "status":val.fk_idStatusTurnos
                  }
                  this.misTurnos = [...this.misTurnos,this.modelData];
                  this.getClasificadosName(val.fk_idClasificado,this.index);
                  this.index++;
            }
            
          })

        } else {
          console.log("error")
        }
      }, error => {
        this.inPromise=false;
        console.log(error)
      }
    )


  }
  getClasificadosName(id:number, index:number) {
 
    this.clasService.getClasificadosId(id).subscribe(
      (val:any) => {
        
            this.misTurnos[index].rubro=val.Clasificado.titulo;
         
            if(index>= this.misTurnos.length-1){
              this.inPromise= false;
            }
       
      },error=>{console.log(error)}
    )
   
  
  }

}  
