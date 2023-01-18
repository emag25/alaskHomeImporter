import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { DataUsuariosService } from './modulos/usuarios/core/services/dataUsuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { ListenerService } from './core/services/listener.service';
import { LoginService } from './core/services/login.service';
import { LoginGuardian } from './autenticacion/components/login/loginGuardian';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { ProveedoresModule } from './modulos/proveedores/proveedores.module';

@NgModule({
  declarations: [							
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ProductosModule,
    ProveedoresModule,
    AutenticacionModule
  ],

  providers: [DataUsuariosService, CookieService, ListenerService, LoginService, LoginGuardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
