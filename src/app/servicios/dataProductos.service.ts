import { Injectable } from '@angular/core';
import { Producto } from '../productos/producto.modelo';

@Injectable({
  providedIn: 'root'
})
export class DataProductosService {

  private productos: Producto[] = [
    {
      id: 1,
      nombreProducto: 'Lavadora',
      descripcion: 'Lavadora con capacidad de 10 kg, incluye secadora',
      imagen: '../assets/img/lavadora.png',
      precio: 250,
      cuotas: 0,
      descuento: 0,
      categoria: 2
    },
    {
      id: 2,
      nombreProducto: 'Mueble Grande',
      descripcion: 'Sillón familiar para 7 personas color café con 4 cogines',
      imagen: '../assets/img/mueblecafeoscuro.jpg',
      precio: 1400,
      cuotas: 12,
      descuento: 15,
      categoria: 4
    },    
    {
      id: 3,
      nombreProducto: 'Mesa Extra Grande',
      descripcion: 'Mesa para 8 personas colo café oscuro, no incluye sillas',
      imagen: '../assets/img/mesagrande.jpg',
      precio: 300,
      cuotas: 12,
      descuento: 15,
      categoria: 4
    }
  ]

  constructor() { }
  

  getProductos(): Producto[] {
    return this.productos;
  }


  findProductosbyCategoria(categoria: number): Producto[] {
    if (categoria === 0) {
      return this.productos;
    }
    return this.productos.filter(producto => producto.categoria === categoria);
  }


  deleteProducto(id: number) {
    
    let obj = this.productos.find(producto => producto.id === id);

    if (obj !== undefined) {
      let index = this.productos.indexOf(obj);
      this.productos.splice(index, 1);
      return true;
      
    } else {
      return false;
    }
      
  }

}