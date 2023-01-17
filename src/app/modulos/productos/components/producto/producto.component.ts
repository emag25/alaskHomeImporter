import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataProductosService } from '../../core/services/dataProductos.service';
import { ListenerService } from 'src/app/core/services/listener.service';
import { Producto } from './../../core/models/producto.model';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input() producto: Producto ={
    id: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    stock: 0,
    cantidad: 0,
    categoriaId: 0,
    proveedorId: 0,
    carrito: false,
    fav: false,
  };

  @Output() showProduct = new EventEmitter<string>();

  onShowDetail() {
    this.showProduct.emit(this.producto.id);
  }
  // Variables de carrito
  carritoMB = 0;
  iconCarrito = "_shopping_cart";

  // Variables de favoritos
  favoritoMB = 0;

  constructor(private dataProductos:DataProductosService, private router:Router, private listener:ListenerService, private DataUsuario: DataUsuariosService) { }

  ngOnInit() {
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
    this.listener.customFavoritoMB.subscribe(favoritoMB => this.favoritoMB = favoritoMB);
  }

  irEditar(id: number) {
    this.router.navigate(['/peliculas-editar',id]); // componente no creado aun
  }

  

  eliminar(id: string) {
    this.dataProductos.deleteProducto(id);
  }

  accionCarrito() {
    if (this.producto.carrito) {
      this.addCarrito();
    }
    else {
      this.removeCarrito();
    }
  }

  addCarrito() {
    this.listener.addMatBadge(this.listener.getMatBadge());
    this.DataUsuario.addCarrito(1, {id: parseInt(this.producto.id), cantidad: this.producto.cantidad, precio: this.producto.precio, total: this.producto.precio * this.producto.cantidad})

  }

  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.DataUsuario.removeCarrito(1, parseInt(this.producto.id));
  }

  // Controlador de agregar o eliminar favorito
  accionFavorito() {
    if (this.producto.fav) {
      this.addFavorito();
    }
    else {
      this.removeFavorito();
    }
  }

  // Agregar favorito
  addFavorito() {
    this.listener.addFavoritoMB(this.listener.getFavoritoMB());
    this.DataUsuario.addFavorito(1, {id: parseInt(this.producto.id)})
  }

  // Eliminar favorito
  removeFavorito() {
    this.listener.removeFavoritoMB(this.listener.getFavoritoMB());
    this.DataUsuario.removeFavorito(1, parseInt(this.producto.id));
  }

}