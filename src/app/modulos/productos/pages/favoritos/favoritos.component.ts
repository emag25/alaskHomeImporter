import { Component } from '@angular/core';
import { Producto } from 'src/app/modulos/productos/interfaces/producto.interface';
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
  productos: Producto[] = [];
  products: Producto[] = [];
  idUsuario = 0;

  constructor(
    private dataUsuarios: DataUsuariosService,
    private dataProductos: DataProductosService,
    private login: LoginService
  ) { }

  ngOnInit() {
    this.dataProductos.obtenerProductos().toPromise().then(
      resp => {
        console.log(resp);
        this.products = resp;
        this.idUsuario = this.login.getLoggedUserId();
        this.favorito = this.dataUsuarios.getFavorito(this.idUsuario);
        this.favorito.forEach((favorito: { id: any; }) => {
          for(let i = 0;i<this.products.length; i++){
            if(this.products[i].id == String(favorito.id)){
              const product: Producto = {
                id: this.products[i].id,
                nombre: this.products[i].nombre,
                descripcion: this.products[i].descripcion,
                imagen: this.products[i].imagen,
                precio: this.products[i].precio,
                stock: this.products[i].stock,
                cantidad: this.products[i].cantidad,
                categoria: this.products[i].categoria,
                proveedor: this.products[i].proveedor,
                carrito: this.products[i].carrito,
                fav: this.products[i].fav
              }
              this.productos.push(product);
            }
          }                    
        });
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
