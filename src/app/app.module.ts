import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import { ProductosModule } from './modulos/productos/productos.module';
import { ProveedoresModule } from './modulos/proveedores/proveedores.module';
import { AutenticacionModule } from './core/autenticacion/autenticacion.module';
import { LoginGuardian } from './core/autenticacion/components/login/loginGuardian';
import { InicioComponent } from './core/inicio/inicio.component';
import { DataUsuariosService } from './modulos/usuarios/services/dataUsuarios.service';
import { ListenerService } from './shared/services/listener.service';
import { LoginService } from './shared/services/login.service';

@NgModule({
  declarations: [							
    AppComponent,
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
