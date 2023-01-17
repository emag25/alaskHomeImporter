import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CardCarritoComponent } from './components/card-carrito/card-carrito.component';

@NgModule({
  declarations: [
    CarritoComponent,
    CardCarritoComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule
  ],
  exports: []
})
export class VentasModule { }
