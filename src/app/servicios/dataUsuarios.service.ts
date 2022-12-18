import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataUsuariosService {

  private listaUsuarios: Usuario[] = [
    { id: 1, nombre: 'Emely', apellido: 'Apraez', email: 'emelyapraez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 2, nombre: 'Paula', apellido: 'Yanez', email: 'paulayanez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 3, nombre: 'Ruben', apellido: 'Vera', email: 'rubenvera@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 4, nombre: 'Arturo', apellido: 'Villavicencio', email: 'arturovillavicencio@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 5, nombre: 'Juan', apellido: 'Perez', email: 'juanperez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 6, nombre: 'Maria', apellido: 'Gomez', email: 'mariagomez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 7, nombre: 'Pedro', apellido: 'Gonzalez', email: 'pedogonzalez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' },
    { id: 8, nombre: 'Jose', apellido: 'Lopez', email: 'joselopez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: 'cliente' }
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


}
