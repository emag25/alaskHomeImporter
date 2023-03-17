import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ProveedoresAdministradorComponent } from './pages/proveedores-administrador/proveedores-administrador.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosAdministradorComponent } from './pages/productos-administrador/productos-administrador.component';
import { UsuariosAdministradorComponent } from './pages/usuarios-administrador/usuarios-administrador.component';
import { VentasAdministradorComponent } from './pages/ventas-administrador/ventas-administrador.component';
import { ModificarProveedorComponent } from './components/proveedores/modificar-proveedor/modificar-proveedor.component';
import { SolicitudProveedorAdminComponent } from './pages/solicitud-proveedor-admin/solicitud-proveedor-admin.component';
import { ModificarSolicitudComponent } from './components/proveedores/modificar-solicitud/modificar-solicitud.component';
import { ModificarUsuarioComponent } from './components/usuarios/modificar-usuario/modificar-usuario.component';
import { ModificarProductoComponent } from './components/productos/modificar-producto/modificar-producto.component';
import { AgregarProductoComponent } from './components/productos/agregar-producto/agregar-producto.component';
import { DialogAdvertenciaComponent } from './components/proveedores/dialogAdvertencia/dialogAdvertencia.component';
import { VerVentaComponent } from './components/ventas/ver-venta/ver-venta.component';


@NgModule({
  declarations: [
    AdministracionComponent,
    ProveedoresAdministradorComponent,
    ModificarProveedorComponent,
    ProductosAdministradorComponent,
    UsuariosAdministradorComponent,
    VentasAdministradorComponent,
    ModificarSolicitudComponent,
    SolicitudProveedorAdminComponent,
    ModificarUsuarioComponent,
    ModificarProductoComponent,
    AgregarProductoComponent,
    DialogAdvertenciaComponent,
    VerVentaComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    SharedModule 
  ]
})
export class AdministracionModule { }
