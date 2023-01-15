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
  matBadge: number = 0;
  disabledAdd: boolean = false;
  disabledRemove: boolean = true;
  icono: string = 'add_shopping_cart';
  btnNombre: string = 'Añadir al carrito';
  checked: boolean = false;

  constructor(private dataProductos:DataProductosService, private router:Router, private listener:ListenerService) { }

  ngOnInit() {
    this.listener.customMatBadge.subscribe(matBadge => this.matBadge = matBadge);
  }

  irEditar(id: number) {
    this.router.navigate(['/peliculas-editar',id]); // componente no creado aun
  }

  eliminar(id: number) {
    this.dataProductos.deleteProducto(id);
  }

  onClick() {

    if (this.checked) {
      this.icono = 'remove_shopping_cart';
      this.btnNombre = 'Eliminar del carrito';
      this.addProducto();

    } else{
      this.icono = 'add_shopping_cart';
      this.btnNombre = 'Añadir al carrito';
      this.removeProducto();
    }

  }

  addProducto() {
    this.listener.addMatBadge(this.listener.getMatBadge());
    /* this.disabledAdd = true;
    this.disabledRemove = false; */
  }

  removeProducto() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    /* this.disabledRemove = true;
    this.disabledAdd = false; */
  }

}