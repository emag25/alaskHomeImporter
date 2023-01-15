import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataProductosService } from '../../core/services/dataProductos.service';
import { ListenerService } from 'src/app/core/services/listener.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input() producto: any;

  // Variables de carrito
  carritoMB = 0;
  checkedCarrito = false;
  iconCarrito = "add_shopping_cart";
  colorCarrito = "";

  // Variables de favoritos
  favoritoMB = 0;
  checkedFavorito = false;
  iconFavorito = "";
  colorFavorito = "#23212B";

  constructor(private dataProductos:DataProductosService, private router:Router, private listener:ListenerService) { }

  ngOnInit() {
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
  }

  irEditar(id: number) {
    this.router.navigate(['/peliculas-editar',id]); // componente no creado aun
  }

  eliminar(id: number) {
    this.dataProductos.deleteProducto(id);
  }

  accionCarrito() {
    console.log(this.iconCarrito)
    if (this.checkedCarrito) {
      this.addCarrito();
    }
    else {
      this.removeCarrito();
    }
  }

  addCarrito() {
    this.listener.addMatBadge(this.listener.getMatBadge());
    this.producto.carrito = true;
    this.iconCarrito = "remove_shopping_cart";
  }

  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.producto.carrito = false;
    this.iconCarrito = "add_shopping_cart";
  }

  // Controlador de agregar o eliminar favorito
  accionFavorito() {
    if (this.checkedFavorito) {
      this.addFavorito();
    }
    else {
      this.removeFavorito();
    }
  }

  // Agregar favorito
  addFavorito() {
    this.listener.addFavoritoMB(this.listener.getFavoritoMB());
    this.producto.favorito = true;
    this.colorFavorito = "#E45D4C";
  }

  // Eliminar favorito
  removeFavorito() {
    this.listener.removeFavoritoMB(this.listener.getFavoritoMB());
    this.producto.favorito = false;
    this.colorFavorito = "#23212B";
  }

}