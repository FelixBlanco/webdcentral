import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapaComponent } from './component/mapa/mapa.component';
import { CuponsappComponent } from './component/cuponsapp/cuponsapp.component';
import { NotificationappComponent } from './component/notificationapp/notificationapp.component';
import { AuthbackendComponent } from './component/authbackend/authbackend.component';
import { GestionUsuarioComponent } from './component/gestion-usuario/gestion-usuario.component';
import { ForgetComponent } from './component/forget/forget.component';

import { GaleriaHomeComponent } from './component/galeria-home/galeria-home.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { ConfigFooterComponent } from './component/config-footer/config-footer.component';
import { ConfigHomeComponent } from './component/config-home/config-home.component';
import { OfertasComponent } from './component/ofertas/ofertas.component';
import { ReclamosSugerenciasComponent } from './component/reclamos-sugerencias/reclamos-sugerencias.component';
import { ConfigColorComponent } from './component/config-color/config-color.component';
import { DestacadosComponent } from './component/destacados/destacados.component';
import { PreguntasFrecuentesComponent } from './component/preguntas-frecuentes/preguntas-frecuentes.component';
import {  ConfigRedesComponent } from './component/config-redes/config-redes.component'
import { SuscripcionComponent } from './component/suscripcion/suscripcion.component';
import { LocalesAdheridosComponent } from './component/locales-adheridos/locales-adheridos.component';
import { GaleryProductComponent } from './component/galery-product/galery-product.component';
import { ClasificadosComponent } from './component/clasificados/clasificados.component';
import { TurnoComponent } from './component/turno/turno.component';

const routes: Routes = [
  { path: 'Galeria', component: GaleriaHomeComponent },
  { path: 'Mapa', component: MapaComponent },
  { path: 'Cupones', component: CuponsappComponent },
  { path: 'Notificaciones', component: NotificationappComponent },
  { path: 'gestionar-usuarios', component:  GestionUsuarioComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: 'config-footer', component: ConfigFooterComponent },
  // { path: 'config-home', component: ConfigHomeComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'reclamos-sugerencias', component: ReclamosSugerenciasComponent},
  { path: 'config-color', component: ConfigColorComponent},
  { path: 'destacados', component: DestacadosComponent},
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent},
  { path: 'config-redes', component: ConfigRedesComponent },
  { path: 'suscriptores', component: SuscripcionComponent },
  { path: 'galery-product', component: GaleryProductComponent },
  { path: 'clasificados', component: ClasificadosComponent },
  { path: 'turno', component: TurnoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

