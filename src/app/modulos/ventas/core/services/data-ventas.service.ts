import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class DataVentasService {

  private ventas: Venta[] = [
    {
      id: 1,
      cliente: 'Arturo Villavicencio',
      email: 'arturo@gmail.com',
      telefono: '0987654321',
      provincia: 'Guayas',
      direccion: 'ABC',
      productos: [
        {
          id: '1',
          nombre: 'Lavadora',
          descripcion: 'Cosas que poca gente sabe es que tiene un tambor central grande con orificios, dentro de otro tambor cerrado, mientras entra agua, haciendo que se mezcle el (detergente) con la ropa sucia. ​ El tambor se mueve con un motor eléctrico.',
          imagen: '../assets/img/lavadora.png',
          precio: 450.00,
          stock: 100,      
          categoriaId: 2,      
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 0      
        },
        {
          id: '2',
          nombre: 'Mesa',
          descripcion: 'Cosas que poca gente sabe es que tiene un tambor central grande con orificios, dentro de otro tambor cerrado, mientras entra agua, haciendo que se mezcle el (detergente) con la ropa sucia. ​ El tambor se mueve con un motor eléctrico.',
          imagen: '../assets/img/lavadora.png',
          precio: 450.00,
          stock: 100,      
          categoriaId: 2,      
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 0      
        }
      ],
      total: 300
    },
    {
      id: 2,
      cliente: 'Alex Villa',
      email: 'alex@gmail.com',
      telefono: '0123456789',
      provincia: 'Ambato',
      direccion: 'XYZ',
      productos: [
        {
          id: '1',
          nombre: 'Lavadora',
          descripcion: 'Cosas que poca gente sabe es que tiene un tambor central grande con orificios, dentro de otro tambor cerrado, mientras entra agua, haciendo que se mezcle el (detergente) con la ropa sucia. ​ El tambor se mueve con un motor eléctrico.',
          imagen: '../assets/img/lavadora.png',
          precio: 450.00,
          stock: 100,      
          categoriaId: 2,      
          carrito: false,
          fav: false,
          cantidad: 1,
          proveedorId: 0      
        }
      ],
      total: 400
    }
  ];

  constructor() { }

  setVentas(venta: Venta) {
    this.ventas.push(venta);
  }

  editVenta(venta: Venta) {
    let obj = this.ventas.find(p => p.id === venta.id);

    if (obj !== undefined) {
      let index = this.ventas.indexOf(obj);
      this.ventas[index] = venta;
      return true;

    } else {
      return false;
    }
  }

  getVentas(): Venta[] {
    return this.ventas;
  }

  getVentabyID(id: number) {
    return this.ventas.find(venta => venta.id === id);
  }

  getVentabyCliente(nombre: string, apellido: string) {
    return this.ventas.find(venta => venta.cliente === nombre || venta.cliente === apellido);
  }

  deleteVenta(id: number) {

    let obj = this.ventas.find(venta => venta.id === id);

    if (obj !== undefined) {
      let index = this.ventas.indexOf(obj);
      this.ventas.splice(index, 1);
      return true;

    } else {
      return false;
    }

  }
}
