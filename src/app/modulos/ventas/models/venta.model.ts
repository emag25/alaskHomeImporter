import { Producto } from "src/app/modulos/productos/interfaces/producto.interface";

export interface Venta {
    id: number;
    cliente: string;
    email: string;
    telefono: string;
    provincia: string;
    direccion: string;
    fecha?: Date;
    productos: Producto[];
    total: number;
}