import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';


@NgModule({
  declarations: [
    ProductosComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ]
})
export class ProductosModule { }
