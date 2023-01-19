import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Categoria } from 'src/app/modulos/productos/core/models/categoria.model';
import { Producto } from 'src/app/modulos/productos/core/models/producto.model';
import { DataCategoriasService } from 'src/app/modulos/productos/core/services/dataCategorias.service';
import { Proveedor } from 'src/app/modulos/proveedores/core/models/proveedor.model';
import { DataProveedoresService } from 'src/app/modulos/proveedores/core/services/dataProveedores.service';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  id: string = this.data.producto.id;
  nombre: string = this.data.producto.nombre;
  categorias: Categoria[] = this.dataCategorias.getCategorias();
  proveedores: Proveedor[] = this.dataProveedores.getProveedores();
  imagen: string = this.data.producto.imagen;
  precio: number = this.data.producto.precio;
  descripcion: string = this.data.producto.descripcion;
  stock: number = this.data.producto.stock;
  categoriaId: number = this.data.producto.categoriaId;
  proveedorId: number = this.data.producto.proveedorId;

  categoriaNombre = '';
  proveedorNombre = '';


  getCategoria(){
    for(let i=0; i<this.categorias.length;i++){                
      const nombre = this.categorias.find(n => n.id == this.categoriaId); 
      if(nombre){
        this.categoriaNombre = nombre.nombre;
        return nombre.nombre;
      }      
    }
    return '';
  }
  getProveedor(){
    for(let i=0; i<this.proveedores.length;i++){                
      const nombre = this.proveedores.find(n => n.id == this.proveedorId); 
      if(nombre){
        this.proveedorNombre = nombre.nombre;
        return nombre.nombre;
      }      
    }
    return '';
  }
  getCategoriaNombre(){
    for(let i=0; i<this.categorias.length;i++){                
      const nombre = this.categorias.find(n => n.nombre == this.productoModificado.value.categoriaId); 
      if(nombre){        
        return nombre.id;
      }      
    }
    return 0;
  }
  getProveedorNombre(){
    for(let i=0; i<this.proveedores.length;i++){                
      const nombre = this.proveedores.find(n => n.nombre == this.productoModificado.value.proveedorId); 
      if(nombre){        
        return nombre.id;
      }      
    }
    return 0;
  }



  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto}, private dataCategorias: DataCategoriasService, private dataProveedores:DataProveedoresService) {
    
    this.productoModificado.setValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      imagen: this.data.producto.imagen,
      stock: this.data.producto.stock,
      precio: this.data.producto.precio,
      proveedorId: this.getProveedor(),
      categoriaId: this.getCategoria(),
      cantidad: this.data.producto.cantidad,
      carrito: this.data.producto.carrito,
      fav: this.data.producto.fav,
      descripcion: this.data.producto.descripcion,
    });
  }

  ngOnInit(): void {
  }

  productoModificado = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.maxLength(10),  Validators.pattern('[0-9]*')]),
    precio: new FormControl(0, [Validators.required, Validators.maxLength(10),  Validators.pattern('^[0-9]+(,[0-9]+)?$')]),
    proveedorId: new FormControl('', [Validators.required, ]),
    categoriaId: new FormControl('', [Validators.required, ]),
    cantidad: new FormControl(0, [Validators.required, ]),
    carrito: new FormControl(false, [Validators.required, ]),
    fav: new FormControl(false, [Validators.required, ]),
    descripcion: new FormControl('', [Validators.required, ])
  });

  onSubmit() {

    let objToSend: NavigationExtras = {
      queryParams: {
        id: this.data.producto.id,        
        nombre: this.productoModificado.value.nombre,
        imagen: this.productoModificado.value.imagen,
        stock: this.productoModificado.value.stock,
        precio: this.productoModificado.value.precio,
        proveedorId: this.getProveedorNombre(),
        categoriaId: this.getCategoriaNombre(),
        cantidad: this.productoModificado.value.cantidad,
        carrito: this.productoModificado.value.carrito,
        fav: this.productoModificado.value.fav,
        descripcion: this.productoModificado.value.descripcion,
      },
      skipLocationChange: false,
      fragment: 'top'
    }
    console.log(objToSend);
    this.dialogRef.close();
    this.redirectTo('/administracion/AdminProductos', objToSend);

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri], { state: { datosProducto: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }
}
