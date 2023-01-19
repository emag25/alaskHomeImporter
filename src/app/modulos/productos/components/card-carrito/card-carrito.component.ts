import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { ListenerService } from 'src/app/shared/services/listener.service';
import { LoginService } from 'src/app/shared/services/login.service';
@Component({
  selector: 'app-card-carrito',
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.css']
})
export class CardCarritoComponent {

  @Input() producto: any;
  @Output() idProducto = new EventEmitter<string>();

  carritoMB = 0;
  iconCarrito = "_shopping_cart";

  favoritoMB = 0;
  idUsuario = 0;

  constructor(
    private listener: ListenerService,
    private DataUsuario: DataUsuariosService,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.listener.customMatBadge.subscribe(carritoMB => this.favoritoMB = carritoMB);
    this.idUsuario = this.login.getLoggedUserId();
  }

  eliminarProducto(id: number) {
    this.listener.removeFavoritoMB(this.listener.getFavoritoMB());
    this.producto.fav = false;
    this.idProducto.emit(String(id));
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
    this.DataUsuario.addCarrito(this.idUsuario, {id: parseInt(this.producto.id)})

  }

  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.DataUsuario.removeCarrito(this.idUsuario, parseInt(this.producto.id));
  }

}
