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
    { id: 1, nombre: 'Emely', apellido: 'Apraez', email: 'emelyapraez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', provincia:'Guayas', rol: '2', carrito: [], favorito: []},
    { id: 2, nombre: 'Paula', apellido: 'Yanez', email: 'paulayanez@gmail.com', password: '12345678', telefono: '0934345678', direccion: 'Guasmo', provincia: 'Guayas', rol: '2', carrito: [], favorito: [] },
    { id: 3, nombre: 'Ruben', apellido: 'Vera', email: 'rubenvera@gmail.com', password: '12345678', telefono: '0944345674', direccion: 'Floresta', provincia: 'Los Ríos', rol: '1', carrito: [], favorito: [] },
    { id: 4, nombre: 'Arturo', apellido: 'Villavicencio', email: 'arturovillavicencio@gmail.com', password: '12345678', telefono: '0979685446', direccion: 'Caraguay', provincia: 'Guayas', rol: '1', carrito: [], favorito: [] },
    { id: 5, nombre: 'Juan', apellido: 'Perez', email: 'juanperez@gmail.com', password: '12345678', telefono: '0987643221', direccion: 'Cartagena', provincia: 'Guayas', rol: '1', carrito: [], favorito: [] },
    { id: 6, nombre: 'Maria', apellido: 'Gomez', email: 'mariagomez@gmail.com', password: '12345678', telefono: '0978906554', direccion: 'Argentina y la 11', provincia: 'Guayas', rol: '1', carrito: [], favorito: [] },
    { id: 7, nombre: 'Pedro', apellido: 'Gonzalez', email: 'pedogonzalez@gmail.com', password: '12345678', telefono: '0912340998', direccion: 'Calle Paraguay', provincia:'Manabí',rol: '1', carrito: [], favorito: [] },
    { id: 8, nombre: 'Jose', apellido: 'Lopez', email: 'joselopez@gmail.com', password: '12345678', telefono: '0943789215', direccion: 'Calle Bolivia y la Q',provincia:'Guayas', rol: '1', carrito: [], favorito: [] },
    { id: 9, nombre: 'Mario', apellido: 'Quijije', email: 'marioquijije@gmail.com', password: '12345678', telefono: '0955124569', direccion: 'Argentina y la c',provincia:'Morona Santiago', rol: '1', carrito: [], favorito: [] },
    { id: 10, nombre: 'Martha', apellido: 'Lopez', email: 'marthalopez@gmail.com', password: '12345678', telefono: '0911249050', direccion: 'Portete y la 6ta',provincia:'Carchi', rol: '1', carrito: [], favorito: [] },
    { id: 11, nombre: 'Beatriz', apellido: 'Pinzon', email: 'betty@gmail.com', password: '12345678', telefono: '0955123506', direccion: 'Venezuela y av.Quito',provincia:'El Oro', rol: '1', carrito: [], favorito: [] },
    { id: 12, nombre: 'Carmen', apellido: 'González', email: 'cgonzalez@gmail.com', password: '12345678', telefono: '0955198874', direccion: 'Brazil y la 9',provincia:'Guayas', rol: '1', carrito: [], favorito: [] },
    { id: 13, nombre: 'Luis', apellido: 'Villamar', email: 'villamarluis@gmail.com', password: '12345678', telefono: '0911009345', direccion: 'Aguirre y Abad',provincia:'Esmeraldas', rol: '1', carrito: [], favorito: [] },
    { id: 14, nombre: 'Kate', apellido: 'Sharma', email: 'katesharma@gmail.com', password: '12345678', telefono: '0933459874', direccion: 'Eloy Alfaro',provincia:'Chimborazo', rol: '1', carrito: [], favorito: [] },
    { id: 15, nombre: 'Jon', apellido: 'Nieve', email: 'jnieve@gmail.com', password: '12345678', telefono: '0966227788', direccion: 'Noguchi 1234', provincia: 'Guayas', rol: '1', carrito: [], favorito: [] }

  ]

  constructor() { }

  
  getUsuario(): Usuario[] {
    return this.listaUsuarios;
  }


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
  getPassword(password: string){

    return this.listaUsuarios.find(user => user.password ===password);



  }

  editUsuario(usuario: Usuario) {
    let obj = this.listaUsuarios.find(p => p.id === usuario.id);

    if (obj !== undefined) {
      let index = this.listaUsuarios.indexOf(obj);
      this.listaUsuarios[index] = usuario;
      return true;

    } else {
      return false;
    }
  }


  setUsuario(usuario: Usuario) {
    this.listaUsuarios.push(usuario);
  }

  register(id: number, nombre: string, apellido: string,  email: string, password: string, telefono: string, direccion: string, provincia: string, rol: string) {
    const newUser = {id, nombre, apellido, telefono, email, password, direccion,provincia, rol};
    this.listaUsuarios.push(newUser);
  }

  changePassword(contraseña:string, id:number) {
    let currentUser = this.listaUsuarios.find(user => user.id ===id);
    if(currentUser){
        currentUser.password = contraseña;
    }else{
        console.log("password incorrecta");
    }
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
