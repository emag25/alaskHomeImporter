import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { SolicitudProveedorComponent } from './components/solicitud-proveedor/solicitud-proveedor.component';
import { DataProveedoresService } from './core/services/dataProveedores.service';
import { DataProvinciasService } from './core/services/dataProvincias.service';
import { DialogExitoComponent } from './components/dialogExito/dialogExito.component';
import { CookieService } from 'ngx-cookie-service';
import { DataSolicitudProveedorService } from './core/services/dataSolicitudProveedor.service';


@NgModule({
  declarations: [
    ProveedoresComponent,
    SolicitudProveedorComponent,
    DialogExitoComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    SharedModule
  ],
  providers: [DataProveedoresService, DataProvinciasService, DataSolicitudProveedorService, CookieService]
})
export class ProveedoresModule { }
