import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modulos/productos/core/models/producto.model';
import { DataProductosService } from 'src/app/modulos/productos/core/services/dataProductos.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  favorito: any;
  producto: any;
  productos: Producto[] = [];

  constructor(
    private dataUsuarios: DataUsuariosService,
    private dataProductos: DataProductosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favorito = this.dataUsuarios.getFavorito(1);
      this.favorito.forEach((favorito: { id: any; }) => {
        this.producto = this.dataProductos.findProductobyID(String(favorito.id));
        this.productos.push(this.producto);
      });

  }

  deleteProducto(id: string) {
    let obj = this.productos.find(product => product.id == id);

    if (obj !== undefined) {
      let index = this.productos.indexOf(obj);
      this.productos.splice(index, 1);
      this.favorito.splice(index, 1);
    }
  }

}
