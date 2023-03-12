export interface Producto {
   
    id?: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    cantidad: number;
    categoria?: number;
    proveedor?: number;    
    carrito?: boolean;
    fav?: boolean;
    
}

