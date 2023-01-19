export class Producto {
    constructor(
    public id: string,
    public nombre: string,
    public descripcion: string,
    public imagen: string,
    public precio: number,
    public stock: number,
    public cantidad: number,
    public categoriaId: number,
    public proveedorId: number,    
    public carrito: boolean,
    public fav: boolean,
    ) { }
}

