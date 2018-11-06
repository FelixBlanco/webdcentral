import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Question } from '../../preguntas-frecuentes/preguntas-frecuentes.component';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrls: ['./preguntas-frecuentes.component.css']
})
export class PreguntasFrecuentesComponent implements OnInit {

  preguntasList: Question[];
  constructor(private preguntasService: PreguntasService, private ts: AlertsService) { }

  ngOnInit() {
    this.preguntasService.getAll().subscribe((resp)=> {
      if(resp.ok && resp.status === 202){
        this.preguntasList = resp.body.PFrec as Array<Question>;
      }else{
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
      }
    }, error => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    })
  }

}
