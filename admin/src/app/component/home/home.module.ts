import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Formularios 

import { HomeComponent } from './home.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';
import { ConfigFooterComponent } from '../config-footer/config-footer.component';
import { ConfigHomeComponent } from '../config-home/config-home.component';
import { GaleriaHomeComponent } from '../galeria-home/galeria-home.component';
import { OfertasComponent } from './../ofertas/ofertas.component';
import { ReclamosSugerenciasComponent } from './../reclamos-sugerencias/reclamos-sugerencias.component';
import { ConfigColorComponent } from './../config-color/config-color.component';
import { AlertsComponent } from './../alerts/alerts.component';
import { PreguntasFrecuentesComponent } from '../preguntas-frecuentes/preguntas-frecuentes.component';

import { PreguntasService } from './../../services/preguntas.service';
import { AlertsService } from 'src/app/services/alerts.service';

const routerAdmin: Routes = [
  { path: 'home',
    children:[
      { path: '', component: ConfigColorComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'config-footer', component: ConfigFooterComponent },
      { path: 'config-home', component: ConfigHomeComponent },
      { path: 'galeria-home', component: GaleriaHomeComponent},
      { path: 'ofertas', component: OfertasComponent },
      { path: 'reclamos-sugerencias', component: ReclamosSugerenciasComponent},
      { path: 'config-color', component: ConfigColorComponent},
      { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent},
    ]
  }
] 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerAdmin),
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    PerfilComponent,
    NavAdminComponent,
    ConfigFooterComponent,
    ConfigHomeComponent,
    PerfilComponent,
    GaleriaHomeComponent,
    OfertasComponent,
    ReclamosSugerenciasComponent,
    ConfigColorComponent,
    AlertsComponent,
    PreguntasFrecuentesComponent
  ],
  exports:[
    RouterModule
  ],
  providers: [
    PreguntasService,
    AlertsService
  ]
})
export class HomeModule { }

