import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; //Formularios 

import { HomeComponent } from './home.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { NavAdminComponent } from '../nav-admin/nav-admin.component';
import { ConfigFooterComponent } from '../config-footer/config-footer.component';
import { ConfigHomeComponent } from '../config-home/config-home.component';
import { GaleriaHomeComponent } from '../galeria-home/galeria-home.component';
import { OfertasComponent } from './../ofertas/ofertas.component';
import { ReclamosSugerenciasComponent } from './../reclamos-sugerencias/reclamos-sugerencias.component';
import { ConfigColorComponent } from './../config-color/config-color.component';

const routerAdmin: Routes = [
  { path: 'home', component: HomeComponent,
    children:[
      { path: 'perfil', component: PerfilComponent },
      { path: 'config-footer', component: ConfigFooterComponent },
      { path: 'config-home', component: ConfigHomeComponent },
      { path: 'galeria-home', component: GaleriaHomeComponent},
      { path: 'ofertas', component: OfertasComponent },
      { path: 'reclamos-sugerencias', component: ReclamosSugerenciasComponent},
      { path: 'config-color', component: ConfigColorComponent},
    ]
  }
] 

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerAdmin),
    FormsModule
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
    ConfigColorComponent
  ],
  exports:[
    RouterModule
  ]
})
export class HomeModule { }

