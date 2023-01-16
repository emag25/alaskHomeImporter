import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarritoComponent } from './pages/carrito/carrito.component';

@NgModule({
  declarations: [
    CarritoComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ],
  exports: []
})
export class VentasModule { }
