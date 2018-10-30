import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule }  from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SetingComponent } from './seting/seting.component';

import { NavUnoComponent } from './component/nav-uno/nav-uno.component';
import { NavDosComponent } from './component/nav-dos/nav-dos.component';
import { EntregaComponent } from './component/entrega/entrega.component';
import { MarcaComponent } from './component/marca/marca.component';
import { MascotasComponent } from './component/mascotas/mascotas.component';
import { SlideHomeComponent } from './component/slide-home/slide-home.component';
import { ProductosComponent } from './component/productos/productos.component';
import { ProductosInicioComponent } from './component/productos-inicio/productos-inicio.component';
import { ReclamosInicioComponent } from './component/reclamos-inicio/reclamos-inicio.component';
import { NovedadesInicioComponent } from './component/novedades-inicio/novedades-inicio.component';
import { MasVendidoInicioComponent } from './component/mas-vendido-inicio/mas-vendido-inicio.component';
import { LocalesAdherideInicioComponent } from './component/locales-adheride-inicio/locales-adheride-inicio.component';
import { EnviosInicioComponent } from './component/envios-inicio/envios-inicio.component';
import { ImgInicioComponent } from './component/img-inicio/img-inicio.component';
import { BajaAppInicioComponent } from './component/baja-app-inicio/baja-app-inicio.component';
import { DestacadoInicioComponent } from './component/destacado-inicio/destacado-inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './component/home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './component/test/test.component';
import { MapaComponent } from './component/mapa/mapa.component';
import { ComponentComponent } from './component/component.component';
import { CuponsappComponent } from './component/cuponsapp/cuponsapp.component';
import { NotificationappComponent } from './component/notificationapp/notificationapp.component';
import { AuthbackendComponent } from './component/authbackend/authbackend.component';
import { GestionUsuarioComponent } from './component/gestion-usuario/gestion-usuario.component';

import { GaleriaHomeComponent } from './component/galeria-home/galeria-home.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { ConfigFooterComponent } from './component/config-footer/config-footer.component';
import { ConfigHomeComponent } from './component/config-home/config-home.component';
import { OfertasComponent } from './component/ofertas/ofertas.component';
import { ReclamosSugerenciasComponent } from './component/reclamos-sugerencias/reclamos-sugerencias.component';
import { ConfigColorComponent } from './component/config-color/config-color.component';
import { PreguntasFrecuentesComponent } from './component/preguntas-frecuentes/preguntas-frecuentes.component';
import { PreguntasService } from './services/preguntas.service';
import { AlertsService } from './services/alerts.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SetingComponent,
    FooterComponent,
    NavUnoComponent,
    NavDosComponent,
    EntregaComponent,
    MarcaComponent,
    MascotasComponent,
    SlideHomeComponent,
    ProductosComponent,
    ProductosInicioComponent,
    ReclamosInicioComponent,
    NovedadesInicioComponent,
    MasVendidoInicioComponent,
    LocalesAdherideInicioComponent,
    EnviosInicioComponent,
    ImgInicioComponent,
    BajaAppInicioComponent,
    DestacadoInicioComponent,
    TestComponent,
    MapaComponent,
    ComponentComponent,
    CuponsappComponent,
    NotificationappComponent,
    AuthbackendComponent,
    GestionUsuarioComponent,
    PerfilComponent,    
    ConfigFooterComponent,
    ConfigHomeComponent,
    OfertasComponent,
    ReclamosSugerenciasComponent,
    ConfigColorComponent,
    GaleriaHomeComponent,
    PreguntasFrecuentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    PreguntasService,
    AlertsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
