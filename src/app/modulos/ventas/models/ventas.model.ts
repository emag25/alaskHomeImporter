import { Carrito } from "./carrito.model";

export interface Ventas {
    id: number,
    carrito: number,
    usuario: string,
    email: string,
    telefono: string,
    provincia: string,
    direccion: string,
    total: number,
    estado: string,
    carritos?: Carrito[]
}