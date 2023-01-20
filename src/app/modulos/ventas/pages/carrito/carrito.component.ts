import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/modulos/productos/models/producto.model';
import { DataProductosService } from 'src/app/modulos/productos/services/dataProductos.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { ListenerService } from 'src/app/shared/services/listener.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  carrito: any;
  producto: any;
  productos: Producto[] = [];
  usuario: any;
  carritoMB = 0;
  subtotal = 0;
  iva = 0;
  total = 0;

  idUsuario = 0;

  constructor(
    private dataUsuarios: DataUsuariosService,
    private dataProductos: DataProductosService,
    private router: Router,
    private listener: ListenerService,
    private login: LoginService
  ) {}

  ngOnInit() {
    this.idUsuario = this.login.getLoggedUserId();
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
    this.carrito = this.dataUsuarios.getCarrito(this.idUsuario);
      this.carrito.forEach((carro: { id: any; }) => {
        this.producto = this.dataProductos.findProductobyID(String(carro.id));
        this.productos.push(this.producto);
      });


    this.productos.forEach(product => {
      this.subtotal += product.cantidad * product.precio;
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
    });

    this.iva = this.subtotal * 0.12;
    this.iva = parseFloat(this.iva.toFixed(2));
    this.total = this.subtotal + this.iva;
    this.total = parseFloat(this.total.toFixed(2));
  }

  deleteProducto(id: string) {
    let obj = this.productos.find(product => product.id == id);

    if (obj !== undefined) {
      let index = this.productos.indexOf(obj);
      this.productos.splice(index, 1);
      this.carrito.splice(index, 1);
      this.subtotal -= obj.precio * obj.cantidad;
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
      this.iva = this.subtotal * 0.12;
      this.iva = parseFloat(this.iva.toFixed(2));
      this.total = this.subtotal + this.iva;
      this.total = parseFloat(this.total.toFixed(2));
      obj.cantidad = 1;
      this.listener.restMatBadge(this.listener.getMatBadge());
      obj.carrito = false;
    }
  }

  irProductos() {
    this.router.navigate(['/productos']);
  }

  irProceso() {
    this.router.navigate(['/ventas/proceso']);
  }

  addCantidad(id: string) {
    
    this.producto = this.productos.find(idProduct => idProduct.id == id);
    
    if(this.producto.cantidad < this.producto.stock) {
      this.producto.cantidad += 1;
      this.subtotal += this.producto.precio;
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
      this.iva = this.subtotal * 0.12;
      this.iva = parseFloat(this.iva.toFixed(2));
      this.total = this.subtotal + this.iva;
      this.total = parseFloat(this.total.toFixed(2));
    }
  }

  removeCantidad(id: string) {

    this.producto = this.productos.find(idProduct => idProduct.id == id);

    if(this.producto.cantidad > 1) {
      this.producto.cantidad -= 1;
      this.subtotal -= this.producto.precio;
      this.subtotal = parseFloat(this.subtotal.toFixed(2));
      this.iva = this.subtotal * 0.12;
      this.iva = parseFloat(this.iva.toFixed(2));
      this.total = this.subtotal + this.iva;
      this.total = parseFloat(this.total.toFixed(2));
    }
  }

}
