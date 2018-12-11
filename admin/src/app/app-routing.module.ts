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
import { ConfigRedesComponent } from './component/config-redes/config-redes.component';
import { SuscripcionComponent } from './component/suscripcion/suscripcion.component';
import { LocalesAdheridosComponent } from './component/locales-adheridos/locales-adheridos.component';
import { GaleryProductComponent } from './component/galery-product/galery-product.component';
import { ClasificadosComponent } from './component/clasificados/clasificados.component';
import { TurnoComponent } from './component/turno/turno.component';
import { CategoriaBlogComponent } from './component/categoria-blog/categoria-blog.component';
import { BlogComponent } from './component/blog/blog.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PageComponent } from './component/layout/page/page.component';
import { PrincipalComponent } from './component/layout/principal/principal.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: PrincipalComponent,
    canLoad: [],
    children: [
      { path: 'Galeria', component: GaleriaHomeComponent, canActivate: [AuthGuard] },
      { path: 'Mapa', component: MapaComponent, canActivate: [AuthGuard] },
      { path: 'Cupones', component: CuponsappComponent, canActivate: [AuthGuard] },
      { path: 'Notificaciones', component: NotificationappComponent, canActivate: [AuthGuard] },
      { path: 'gestionar-usuarios', component: GestionUsuarioComponent, canActivate: [AuthGuard] },
      { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
      { path: 'config-footer', component: ConfigFooterComponent, canActivate: [AuthGuard] },
      { path: 'ofertas', component: OfertasComponent, canActivate: [AuthGuard] },
      { path: 'reclamos-sugerencias', component: ReclamosSugerenciasComponent, canActivate: [AuthGuard] },
      { path: 'config-color', component: ConfigColorComponent, canActivate: [AuthGuard] },
      { path: 'destacados', component: DestacadosComponent, canActivate: [AuthGuard] },
      { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent, canActivate: [AuthGuard] },
      { path: 'config-redes', component: ConfigRedesComponent, canActivate: [AuthGuard] },
      { path: 'suscriptores', component: SuscripcionComponent, canActivate: [AuthGuard] },
      { path: 'galery-product', component: GaleryProductComponent, canActivate: [AuthGuard] },
      { path: 'clasificados', component: ClasificadosComponent, canActivate: [AuthGuard] },
      { path: 'turno', component: TurnoComponent, canActivate: [AuthGuard] },
      { path: 'categoria-blog', component: CategoriaBlogComponent, canActivate: [AuthGuard] },
      { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
      { path: 'locales-adheridos', component: LocalesAdheridosComponent, canActivate: [AuthGuard] },
    ]
  }, {
    path: '',
    component: PageComponent,
    children: [
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: AuthbackendComponent }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

