import { Injectable } from '@angular/core';
import { Carrito, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataUsuariosService {

  item: any;
  carro: any;

  private listaUsuarios: Usuario[] = [
    { id: 1, nombre: 'Emely', apellido: 'Apraez', email: 'emelyapraez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '2', carrito: [] },
    { id: 2, nombre: 'Paula', apellido: 'Yanez', email: 'paulayanez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '2', carrito: [] },
    { id: 3, nombre: 'Ruben', apellido: 'Vera', email: 'rubenvera@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [] },
    { id: 4, nombre: 'Arturo', apellido: 'Villavicencio', email: 'arturovillavicencio@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [] },
    { id: 5, nombre: 'Juan', apellido: 'Perez', email: 'juanperez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [] },
    { id: 6, nombre: 'Maria', apellido: 'Gomez', email: 'mariagomez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [] },
    { id: 7, nombre: 'Pedro', apellido: 'Gonzalez', email: 'pedogonzalez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [] },
    { id: 8, nombre: 'Jose', apellido: 'Lopez', email: 'joselopez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [] }
  ]

  constructor() { }

  getlistaUsuarios() {
    return this.listaUsuarios;
  }

  findUserbyEmailPass(email: string, password: string) {
    return this.listaUsuarios.find(user => user.email === email && user.password === password);
  }

  findUserbyID(id: number) {
    return this.listaUsuarios.find(user => user.id === id);
  }

  getRol(id: number) {
    return this.listaUsuarios.find(user => user.id === id)?.rol;
  }

  getCarrito(id: number) {
    let usuario = this.listaUsuarios.find(user => user.id === id);
    
    return usuario?.carrito;
  }

  addCarrito(id: number, carrito: Carrito) {
    this.item = this.listaUsuarios.find(user => user.id == id);
    this.item.carrito.push(carrito);
    console.log(this.item)
  }

  removeCarrito(id: number, idCarro: number) {
    this.item = this.listaUsuarios.find(user => user.id == id);
    this.carro = this.item.carrito.find((idCarrito: { id: number; }) => idCarrito.id == idCarro);

    if(this.carro !== undefined) {
      let index = this.item.carrito.indexOf(idCarro);
      console.log(index);
      this.item.carrito.splice(index-1, 1);
    }
  }

}
