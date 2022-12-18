export class Producto {
    
    public id: number;
    public nombreProducto: string;
    public descripcion: string;
    public imagen: string;
    public precio: number;
    public cuotas: number;
    public descuento: number;
    public categoria: number;

    constructor(id: number, nombreProducto: string, descripcion: string, imagen: string, precio: number, cuotas: number, descuento: number, categoria: number) {
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precio = precio;
        this.cuotas = cuotas;
        this.descuento = descuento;
        this.categoria = categoria;
    }
}