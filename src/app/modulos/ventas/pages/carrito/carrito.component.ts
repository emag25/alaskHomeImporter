import { Component } from '@angular/core';
import { Producto } from 'src/app/modulos/productos/core/models/producto.model';
import { DataProductosService } from 'src/app/modulos/productos/core/services/dataProductos.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';

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
  carro: any;
  totalPagar = 0;

  constructor(
    private dataUsuarios: DataUsuariosService,
    private dataProductos: DataProductosService
  ) {}

  ngOnInit() {
    this.carrito = this.dataUsuarios.getCarrito(1);
      this.carrito.forEach((carro: { id: any; }) => {
        this.producto = this.dataProductos.findProductobyID(String(carro.id));
        this.productos.push(this.producto);
      });


      this.productos.forEach(product => {
      this.totalPagar += product.cantidad * product.precio;
    });
  }

  deleteProducto(id: string) {
    let obj = this.productos.find(product => product.id == id);

    if (obj !== undefined) {
      let index = this.productos.indexOf(obj);
      this.productos.splice(index, 1);
      this.carrito.splice(index, 1);
      this.totalPagar -= obj.precio;
    }
  }

  sumarTotal(total: number) {
    this.totalPagar += total;
  }

  restarTotal(total: number) {
    this.totalPagar -= total;
  }

}
