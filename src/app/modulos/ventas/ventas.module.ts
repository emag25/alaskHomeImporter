import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CompraComponent } from './pages/compra/compra.component';
import { DialogExitoComponent } from './components/dialog-exito/dialog-exito.component';
import { DataVentasService } from './services/data-ventas.service';

@NgModule({
  declarations: [
    CarritoComponent,
    CompraComponent,
    DialogExitoComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ],
  providers: [DataVentasService],
  exports: []
})
export class VentasModule { }
