import { Component, OnInit } from '@angular/core';
import { ConfigColorService } from '../../services/config-color.service';
import { RubrosService ,rubroChange } from 'src/app/services/rubros.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {
  filterForm: FormGroup;

  colorTres:any;
  dataRubros:rubroChange=null;
  constructor(
    private fb: FormBuilder,
    private configColor: ConfigColorService,
    private rubrosService: RubrosService
  ) { 
    this.configColor._paletaColor().subscribe(
      (resp:any)=> {
        this.colorTres = resp.colorClaro
      }
    )  
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      rubro: [''],
      subRubroA: [''],
      subRubroB: [''],
    
    });
    this.rubrosService.rubroChangeItem.subscribe(val=>{
      if(val && !val.cambiado){
        console.log(val);
        this.dataRubros=val;
      }
    })
  }
  cambiar(section: 'rubro'|'subRubroA'|'subRubroB'){
    console.log(section);
    const data:rubroChange={
      rubro:null,
      sub1:null,
      sub2:null,
      cambiado:true,
      section:section,
      value:this.filterForm.get(this.dataRubros.section).value
    }
    this.rubrosService.updateChangeRubrosSource(data);
    $('#mascotasModal3').modal('toggle'); 

  }

}
