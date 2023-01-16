export interface Producto {

    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    categoriaId: number;
    proveedorId: number;    
    carrito: boolean;
    fav: boolean;
}