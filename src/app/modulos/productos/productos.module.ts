import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { DescripcionComponent } from './components/descripcion/descripcion.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { CardCarritoComponent } from './components/card-carrito/card-carrito.component';



@NgModule({
  declarations: [
    ProductosComponent,
    ProductoComponent,
    DescripcionComponent,
    FavoritosComponent,
    CardCarritoComponent    
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ]
})
export class ProductosModule { }
