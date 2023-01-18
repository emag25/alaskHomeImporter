import { Injectable } from '@angular/core';
import { Carrito, Favorito, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataUsuariosService {

  item: any;
  carro: any;
  favorito: any;

  private listaUsuarios: Usuario[] = [
    { id: 1, nombre: 'Emely', apellido: 'Apraez', email: 'emelyapraez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '2', carrito: [], favorito: [] },
    { id: 2, nombre: 'Paula', apellido: 'Yanez', email: 'paulayanez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '2', carrito: [], favorito: [] },
    { id: 3, nombre: 'Ruben', apellido: 'Vera', email: 'rubenvera@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [], favorito: [] },
    { id: 4, nombre: 'Arturo', apellido: 'Villavicencio', email: 'arturovillavicencio@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [], favorito: [] },
    { id: 5, nombre: 'Juan', apellido: 'Perez', email: 'juanperez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [], favorito: [] },
    { id: 6, nombre: 'Maria', apellido: 'Gomez', email: 'mariagomez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [], favorito: [] },
    { id: 7, nombre: 'Pedro', apellido: 'Gonzalez', email: 'pedogonzalez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [], favorito: [] },
    { id: 8, nombre: 'Jose', apellido: 'Lopez', email: 'joselopez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '1', carrito: [], favorito: [] }
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

  getFavorito(id: number) {
    let usuario = this.listaUsuarios.find(user => user.id === id);
    
    return usuario?.favorito;
  }

  addCarrito(id: number, carrito: Carrito) {
    this.item = this.listaUsuarios.find(user => user.id == id);
    this.item.carrito.push(carrito);
    
    console.log("ITEM AGREGADO:");
    console.log(this.item.carrito);
  }

  removeCarrito(id: number, idCarro: number) {
    this.item = this.listaUsuarios.find(user => user.id == id);
    this.carro = this.item.carrito.find((idCarrito: { id: number; }) => idCarrito.id == idCarro);

    if(this.carro !== undefined) {
      let index = this.item.carrito.indexOf(this.carro);
      this.item.carrito.splice(index, 1);
    }

    console.log("ITEM REMOVIDO:");
    console.log(this.item.carrito);
  }

  addFavorito(id: number, favorito: Favorito) {
    this.item = this.listaUsuarios.find(user => user.id == id);
    this.item.favorito.push(favorito);
    console.log("Favorito: ");
    console.log(this.item);
  }

  removeFavorito(id: number, idFavorito: number) {
    this.item = this.listaUsuarios.find(user => user.id == id);
    this.favorito = this.item.favorito.find((idFav: { id: number; }) => idFav.id == idFavorito);

    if(this.favorito !== undefined) {
      let index = this.item.favorito.indexOf(idFavorito);
      this.item.favorito.splice(index-1, 1);
    }
  }

}
