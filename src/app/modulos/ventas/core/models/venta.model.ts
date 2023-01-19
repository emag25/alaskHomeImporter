import { Producto } from "src/app/modulos/productos/core/models/producto.model";

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