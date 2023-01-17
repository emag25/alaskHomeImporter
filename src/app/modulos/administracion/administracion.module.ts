import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ProveedoresAdministradorComponent } from './pages/proveedores-administrador/proveedores-administrador.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosAdministradorComponent } from './pages/productos-administrador/productos-administrador.component';
import { UsuariosAdministradorComponent } from './pages/usuarios-administrador/usuarios-administrador.component';
import { VentasAdministradorComponent } from './pages/ventas-administrador/ventas-administrador.component';
import { AgregarProveedorComponent } from './components/proveedores/agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from './components/proveedores/modificar-proveedor/modificar-proveedor.component';
import { ModificarUsuarioComponent } from './components/usuarios/modificar-usuario/modificar-usuario.component';


@NgModule({
  declarations: [
    AdministracionComponent,
    ProveedoresAdministradorComponent,
    AgregarProveedorComponent,
    ModificarProveedorComponent,
    ProductosAdministradorComponent,
    UsuariosAdministradorComponent,
    VentasAdministradorComponent,
    ModificarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    SharedModule
  ]
})
export class AdministracionModule { }
