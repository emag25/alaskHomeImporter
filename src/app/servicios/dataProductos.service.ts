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
    },    
    {
      id: 4,
      nombreProducto: 'Televisor LG',
      descripcion: 'Televisor LG de 86 pulgadas, 4K Full HD',
      imagen: '../assets/img/televisor2.png',
      precio: 850,
      cuotas: 12,
      descuento: 15,
      categoria: 1
    },    
    {
      id: 5,
      nombreProducto: 'Aromatizante Glade',
      descripcion: 'Aromatizante Glade Paraíso Azul automático',
      imagen: '../assets/img/aromatizante.png',
      precio: 20,
      cuotas: 12,
      descuento: 15,
      categoria: 3
    },    
    {
      id: 6,
      nombreProducto: 'Alicate',
      descripcion: 'Alicate doble servicio 7 pulgadas Jonnesway',
      imagen: '../assets/img/alicate.jpg',
      precio: 25,
      cuotas: 12,
      descuento: 15,
      categoria: 5
    },    
    {
      id: 7,
      nombreProducto: 'Bicicleta montañera',
      descripcion: 'Bicicleta montañera 29 GER STAGE 7.2',
      imagen: '../assets/img/bicicleta2.png',
      precio: 900,
      cuotas: 12,
      descuento: 15,
      categoria: 6
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