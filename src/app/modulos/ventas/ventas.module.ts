import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CompraComponent } from './pages/compra/compra.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import { DataVentasService } from './core/services/data-ventas.service';

@NgModule({
  declarations: [
    CarritoComponent,
    CompraComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    SharedModule,
    MatDividerModule,
    MatStepperModule
  ],
  providers: [DataVentasService],
  exports: []
})
export class VentasModule { }
