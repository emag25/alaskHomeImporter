export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: string;
    direccion: string;
    rol: string;
    carrito?: Carrito[];
    favorito?: Favorito[];

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