import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './modulos/usuarios/pages/perfil/perfil.component';
import { ProductosComponent } from './modulos/productos/pages/productos/productos.component';
import { ProductoComponent } from './modulos/productos/components/producto/producto.component';
import { Error403Component } from './shared/error403/error403.component';
import { Error404Component } from './shared/error404/error404.component';
import { DataUsuariosService } from './modulos/usuarios/core/services/dataUsuarios.service';
import { CookieService } from 'ngx-cookie-service';
import { ListenerService } from './core/services/listener.service';
import { ProveedoresComponent } from './modulos/proveedores/pages/proveedores/proveedores.component';
import { AgregarProveedorComponent } from './modulos/administracion/components/proveedores/agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './modulos/administracion/components/proveedores/modificar-proveedor/modificar-proveedor.component';
import { AdministracionComponent } from './modulos/administracion/pages/administracion/administracion.component';
import { LoginService } from './core/services/login.service';
import { LoginGuardian } from './login/loginGuardian';
import { ProductosAdministradorComponent } from './modulos/administracion/pages/productos-administrador/productos-administrador.component';
import { VentasAdministradorComponent } from './modulos/administracion/pages/ventas-administrador/ventas-administrador.component';
import { ProveedoresAdministradorComponent } from './modulos/administracion/pages/proveedores-administrador/proveedores-administrador.component';
import { UsuariosAdministradorComponent } from './modulos/administracion/pages/usuarios-administrador/usuarios-administrador.component';

@NgModule({
  declarations: [							
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    InicioComponent,
    PerfilComponent,
    ProductosComponent,
    ProductoComponent,
    Error403Component,
    Error404Component,
    ProveedoresComponent,
    AgregarProveedorComponent,
    ModificarProveedorComponent,
    AdministracionComponent,
    ProductosAdministradorComponent,
    VentasAdministradorComponent,
    ProveedoresAdministradorComponent,
    UsuariosAdministradorComponent  
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSnackBarModule
  ],

  providers: [DataUsuariosService, CookieService, ListenerService, LoginService, LoginGuardian],
  bootstrap: [AppComponent]
})
export class AppModule { }
