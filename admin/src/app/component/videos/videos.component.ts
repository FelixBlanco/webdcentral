import { Component, OnInit,ViewChild } from '@angular/core';
import { VideosService } from '../../services/videos.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

declare var $:any;

interface Video{
  id:any;
  url:any;
  titulo:any;
}


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  @ViewChild('table') table;

  videos: any;
  rows: Array<Video>;
  columns: any;
  newVideo    : FormGroup;
  editVideo   : FormGroup;
  questionUpdateForm: FormGroup;
  limit: number = 5;
  videoToUpdate: Video;
  inPromise: boolean;

  constructor(
    private videoServices:VideosService,
    private fb: FormBuilder,
    private ts: AlertsService
  ) { 

    this.newVideo = this.fb.group({
      titulo    : ['', Validators.required],
      url       : ['', Validators.required]
    });

    this.editVideo = this.fb.group({
      id   : [''],
      titulo    : ['', Validators.required],
      url       : ['', Validators.required]
    });    

    this.list();

    this.columns = [      
      { prop: 'titulo' },
      { prop: 'url' },
      { prop: 'opts'},
    ];

  }
  
  
  
  
  ngOnInit() {
    
  }

  updateFilter(event){
    const val = event.target.value.toLowerCase();

    const temp = this.videos.filter(function(d) {
      return (d.titulo.toLowerCase().indexOf(val) !== -1 || !val) 
      || (d.url.toLowerCase().indexOf(val) !== -1 || !val);
    });

    this.rows = temp;
    this.table.offset = 0;//Requerido
  }

  list(){
    this.videoServices.getVideos().subscribe((resp:any) => {
      this.videos = resp.PFrec;
      this.rows = [...this.videos];
    }, (error) => {
      this.ts.msg("ERR", "Error", `Error: ${error.status} - ${error.statusText}`);
    });
  }


  save(){
    this.inPromise = true;
    this.videoServices.addVideo(this.newVideo.value).subscribe(
      resp => {
        this.inPromise = false;
        this.ts.msg("OK","Éxito", "Video Guardado");
        $('#nuevo').modal('hide');
        this.newVideo.reset();    
        this.list();    
      },
      error => {
        this.inPromise = false;
        if(error.errors.titulo != null){
          this.ts.msg("ERR","Error", "El titulo es requerido");
        }

        if(error.errors.url != null){
          this.ts.msg("ERR","Error", "La URL es requerido");
        }              
      }
    )
  }

  update(){
    this.inPromise = true;
    this.videoServices.upgradeVideo(this.editVideo.value,this.videoToUpdate.id).subscribe(
      resp => {
        this.inPromise = false;
        this.ts.msg("OK","Éxito", "Video Guardado");
        $('#nuevo').modal('hide');
        this.editVideo.reset();   
        this.list();     
      },
      error => {
        this.inPromise = false;

        if(error.errors.titulo != null){
          this.ts.msg("ERR","Error", "El titulo es requerido");
        }

        if(error.errors.url != null){
          this.ts.msg("ERR","Error", "La URL es requerido");
        }              
      }
    )
  } 
  
  set({id,titulo,url}){
    this.videoToUpdate = {
      id: id,
      titulo: titulo,
      url: url,      
    }

    this.editVideo.get('titulo').setValue(titulo);
    this.editVideo.get('url').setValue(url);
  }  

  delete(){
    this.inPromise = true;
    this.videoServices.deleteVideo(this.videoToUpdate.id)
      .subscribe((resp:any)=>{
        this.ts.msg("OK","Éxito", "Se ha eliminado el registro");
        this.list();
        $('#eliminar').modal('hide');
        this.inPromise = false;
      },(error) => {
        this.ts.msg("ERR", "Error", "Ha ocurrido un error interno");
        this.inPromise = false;
      });
  }  
}
