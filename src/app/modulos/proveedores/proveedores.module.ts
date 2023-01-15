import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SolicitudProveedorComponent } from './components/solicitud-proveedor/solicitud-proveedor.component';
import { DataProveedoresService } from './core/services/dataProveedores.service';


@NgModule({
  declarations: [
    ProveedoresComponent,
    SolicitudProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule
  ],
  providers: [DataProveedoresService]
})
export class ProveedoresModule { }
