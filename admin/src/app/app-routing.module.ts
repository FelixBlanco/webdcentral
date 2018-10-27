import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GaleriaHomeComponent } from './component/galeria-home/galeria-home.component';
import { MapaComponent } from './component/mapa/mapa.component';
import { CuponsappComponent } from './component/cuponsapp/cuponsapp.component';
import { NotificationappComponent } from './component/notificationapp/notificationapp.component';
import { AuthbackendComponent } from './component/authbackend/authbackend.component';

const routes: Routes = [
  { path: 'Galeria', component: GaleriaHomeComponent },
  { path: 'Mapa', component: MapaComponent },
  { path: 'Cupones', component: CuponsappComponent },
  { path: 'Notificaciones', component: NotificationappComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

