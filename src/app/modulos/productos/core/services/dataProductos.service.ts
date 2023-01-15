import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class DataProductosService {

  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Lavadora',
      descripcion: 'Lavadora con capacidad de 10 kg, incluye secadora',
      imagen: '../assets/img/lavadora.png',
      precio: 450,
      stock: 100,
      descuento: 0,
      categoria: 2,
      carrito: false,
      fav: false
    },
    {
      id: 2,
      nombre: 'Mesa Extra Grande',
      descripcion: 'Mesa para 8 personas colo blanco humo, no incluye sillas',
      imagen: '../assets/img/mesagrande.png',
      precio: 300,
      stock: 100,
      descuento: 0,
      categoria: 4,
      carrito: false,
      fav: false
    },
    {
      id: 3,
      nombre: 'Televisor LG',
      descripcion: 'Televisor LG de 86 pulgadas, 4K Full HD',
      imagen: '../assets/img/televisor.png',
      precio: 750,
      stock: 100,
      descuento: 0,
      categoria: 1,
      carrito: false,
      fav: false
    },
    {
      id: 4,
      nombre: 'Aromatizante Glade',
      descripcion: 'Aromatizante Glade Paraíso Azul automático',
      imagen: '../assets/img/aromatizante.png',
      precio: 20,
      stock: 100,
      descuento: 0,
      categoria: 3,
      carrito: false,
      fav: false
    },
    {
      id: 5,
      nombre: 'Sofá Grande',
      descripcion: 'Sillón familiar para 9 personas color gris, incluye 2 cogines',
      imagen: '../assets/img/sofa.png',
      precio: 1200,
      stock: 100,
      descuento: 0,
      categoria: 4,
      carrito: false,
      fav: false
    },
    {
      id: 6,
      nombre: 'Alicate',
      descripcion: 'Alicate doble servicio 7 pulgadas Jonnesway',
      imagen: '../assets/img/alicate.png',
      precio: 25,
      stock: 100,
      descuento: 0,
      categoria: 5,
      carrito: false,
      fav: false
    },
    {
      id: 7,
      nombre: 'Bicicleta montañera',
      descripcion: 'Bicicleta montañera 29 GER STAGE 7.2',
      imagen: '../assets/img/bicicleta.png',
      precio: 900,
      stock: 100,
      descuento: 0,
      categoria: 6,
      carrito: false,
      fav: false
    },
    {
      id: 8,
      nombre: 'Mesa Rústica',
      descripcion: 'Mesa para 8 personas colo café oscuro, no incluye sillas',
      imagen: '../assets/img/mesa.png',
      precio: 900,
      stock: 100,
      descuento: 0,
      categoria: 4,
      carrito: false,
      fav: false
    }
  ];

  constructor() { }

  getProductos(): Producto[] {
    return this.productos;
  }

  findProductosbyCategoria(categoria: number): Producto[] {
    if (categoria == 0) {
      return this.productos;
    } else {
      return this.productos.filter(producto => producto.categoria == categoria);
    }
  }

  findProductobyID(id: number) {
    return this.productos.find(producto => producto.id == id);
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