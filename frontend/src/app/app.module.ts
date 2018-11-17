import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as bootstrap from 'bootstrap';
import { AgmCoreModule } from '@agm/core';

// import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { HomeModule } from './component/home/home.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './component/landing/landing.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ForgetComponent } from './component/forget/forget.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

import { FooterComponent } from './component/footer/footer.component';
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
import { CarritoComponent } from './component/carrito/carrito.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CarritoService } from './services/carrito.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { CarouselItemComponent } from './component/destacado-inicio/carousel-item/carousel-item.component';
import { MarcasService } from './services/marcas.service';
import { AyudaComponent } from './component/ayuda/ayuda.component';
import { PreguntasFrecuentesComponent } from './component/ayuda/preguntas-frecuentes/preguntas-frecuentes.component';
import { OfertasInicioComponent } from './component/ofertas-inicio/ofertas-inicio.component';
import { ContactanosInicioComponent } from './component/contactanos-inicio/contactanos-inicio.component';
import { MaterialUiModule } from './material-ui.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BusquedaComponent } from './component/busqueda/busqueda.component';
import { RecomprarInicioComponent } from './component/recomprar-inicio/recomprar-inicio.component';
import { ServiciosInicioComponent } from './component/servicios-inicio/servicios-inicio.component';
import { ProductosCarouselPageComponent } from './component/productos/productos-carousel-page/productos-carousel-page.component';
import { PerfilClienteComponent } from './component/perfil-cliente/perfil-cliente.component';
import { GaleryProductComponent } from './component/galery-product/galery-product.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget', component: ForgetComponent },
  { path: 'ofertas', component: OfertasInicioComponent },
  { path: 'recompra', component: RecomprarInicioComponent },
  { path: 'servicios', component: ServiciosInicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'perfil-cliente', component: PerfilClienteComponent },
  { path: 'galery-product', component: GaleryProductComponent },
  
  { path: 'home', loadChildren: './component/home/home.module#HomeModule' },
  
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    ForgetComponent,
    PageNotFoundComponent,
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
    CarritoComponent,
    CarouselItemComponent,
    AyudaComponent,
    PreguntasFrecuentesComponent,
    OfertasInicioComponent,
    ContactanosInicioComponent,
    BusquedaComponent,
    RecomprarInicioComponent,
    ServiciosInicioComponent,
    ProductosCarouselPageComponent,
    PerfilClienteComponent,
    GaleryProductComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    HomeModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    MaterialUiModule,
    NgbModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCiGsoFevMN2J-dXWtD_31AN4UkraR4Hq0'
    })
  ],
  providers: [
    CarritoService,
    MarcasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
