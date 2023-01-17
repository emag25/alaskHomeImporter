import { Injectable, Input } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataUsuariosService {

  private listaUsuarios: Usuario[] = [
    { id: 1, nombre: 'Emely', apellido: 'Apraez', email: 'emelyapraez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle 123', rol: '2' },
    { id: 2, nombre: 'Paula', apellido: 'Yanez', email: 'paulayanez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Guasmo', rol: '2' },
    { id: 3, nombre: 'Ruben', apellido: 'Vera', email: 'rubenvera@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Floresta', rol: '1' },
    { id: 4, nombre: 'Arturo', apellido: 'Villavicencio', email: 'arturovillavicencio@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Caraguay', rol: '1' },
    { id: 5, nombre: 'Juan', apellido: 'Perez', email: 'juanperez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Cartagena', rol: '1' },
    { id: 6, nombre: 'Maria', apellido: 'Gomez', email: 'mariagomez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Argentina y la 11', rol: '1' },
    { id: 7, nombre: 'Pedro', apellido: 'Gonzalez', email: 'pedogonzalez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle Paraguay', rol: '1' },
    { id: 8, nombre: 'Jose', apellido: 'Lopez', email: 'joselopez@gmail.com', password: '12345678', telefono: '0912345678', direccion: 'Calle Bolivia y la Q', rol: '1' }
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

  register(id: number, nombre: string, apellido: string,  email: string, password: string, telefono: string, direccion: string, rol: string) {
    // Crea un nuevo objeto de usuario con los campos especificados
    const newUser = {id, nombre, apellido, telefono, email, password, direccion, rol};
    // Agrega el nuevo usuario al array de usuarios
    this.listaUsuarios.push(newUser);
  }

  changePassword(contraseña:string, id:number) {
    // buscar el usuario en el array
    let currentUser = this.listaUsuarios.find(user => user.id ===id);
    // si existe el usuario
    if(currentUser){
        // actualizar contraseña
        currentUser.password = contraseña;
    }else{
        // mostrar mensaje de error
        console.log("password incorrecta");
    }
  }
}
