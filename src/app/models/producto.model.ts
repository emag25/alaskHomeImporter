export class Producto {

    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    stock: number;
    categoria: number;

    constructor(id: number, nombre: string, descripcion: string, imagen: string, precio: number, stock: number, categoria: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }
}