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
    cantidad: number;
    precio: number;
    total: number;
}

export interface Favorito {
    id: number;
}
