import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListenerService } from 'src/app/core/services/listener.service';

@Component({
  selector: 'app-card-carrito',
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.css']
})
export class CardCarritoComponent {

  @Input() producto: any;
  @Output() idProducto = new EventEmitter<string>();
  @Output() addTotal = new EventEmitter<number>();
  @Output() removeTotal = new EventEmitter<number>();

  carritoMB = 0;

  constructor(
    private listener: ListenerService
  ) {}

  ngOnInit() {
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
  }


  addCantidad() {
    if(this.producto.cantidad < this.producto.stock) {
      this.producto.cantidad += 1;
      this.addTotal.emit(this.producto.precio);
    }
  }

  removeCantidad() {
    if(this.producto.cantidad > 1) {
      this.producto.cantidad -= 1;
      this.removeTotal.emit(this.producto.precio);
    }
  }

  eliminarProducto(id: number) {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.producto.carrito = false;
    this.idProducto.emit(String(id));
  }

}
