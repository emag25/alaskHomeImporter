export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    provincia: string;
    rol: string;
    carrito?: Carrito[];
    favorito?: Favorito[];

    constructor(id: number, nombre: string, apellido: string, email: string, password: string, telefono: string, direccion: string, provincia: string, rol: string, carrito?: Carrito[], favorito?: Favorito[]) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.direccion = direccion;
        this.provincia = provincia;
        this.rol = rol;
        this.carrito = carrito;
        this.favorito = favorito;
    }
    
}

export interface Carrito {
    id: number;
}

export interface Favorito {
    id: number;
}

export interface User {
    id_usuario?: number,
    nombre_usuario?: string,
    apellido_usuario?: string,
    email_usuario?: string,
    password_usuario?: string,
    telefono_usuario?: string,
    direccion_usuario?: string,
    provincia_usuario?: string,
    rol_usuario?: string,
    fechaingreso_usuario?: string

  
}
