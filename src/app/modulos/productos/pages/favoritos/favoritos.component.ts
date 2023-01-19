import { Component } from '@angular/core';
import { Producto } from 'src/app/modulos/productos/models/producto.model';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { DataProductosService } from '../../services/dataProductos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  favorito: any;
  producto: any;
  productos: Producto[] = [];
  idUsuario = 0;

  constructor(
    private dataUsuarios: DataUsuariosService,
    private dataProductos: DataProductosService,
    private login: LoginService
  ) { }

  ngOnInit() {
    this.idUsuario = this.login.getLoggedUserId();
    this.favorito = this.dataUsuarios.getFavorito(this.idUsuario);
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
