export interface Producto {

    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    categoria: number;
    descuento?: number;
    carrito: boolean;
    fav: boolean;
}