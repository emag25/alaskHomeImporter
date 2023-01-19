import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudProveedorAdminComponent } from './pages/solicitud-proveedor-admin/solicitud-proveedor-admin.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { ProductosAdministradorComponent } from './pages/productos-administrador/productos-administrador.component';
import { ProveedoresAdministradorComponent } from './pages/proveedores-administrador/proveedores-administrador.component';
import { UsuariosAdministradorComponent } from './pages/usuarios-administrador/usuarios-administrador.component';
import { VentasAdministradorComponent } from './pages/ventas-administrador/ventas-administrador.component';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent
  },
  {
    path: 'AdminUsuarios',
    component: UsuariosAdministradorComponent
  },
  {
    path: 'AdminProductos',
    component: ProductosAdministradorComponent
  },
  {
    path: 'AdminProveedores',
    component: ProveedoresAdministradorComponent
  },
  {
    path: 'AdminProveedores/solicitudes',
    component: SolicitudProveedorAdminComponent
  },
  {
    path: 'AdminVentas',
    component: VentasAdministradorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
