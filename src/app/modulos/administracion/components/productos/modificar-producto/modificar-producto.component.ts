import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Categoria } from 'src/app/modulos/productos/interfaces/categoria.interface';
import { Producto } from 'src/app/modulos/productos/interfaces/producto.interface';
import { DataCategoriasService } from 'src/app/modulos/productos/services/dataCategorias.service';
import { DataProductosService } from 'src/app/modulos/productos/services/dataProductos.service';
import { Proveedor } from 'src/app/modulos/proveedores/models/proveedor.model';
import { DataProveedoresService } from 'src/app/modulos/proveedores/services/dataProveedores.service';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  id?: string = this.data.producto.id;
  nombre: string = this.data.producto.nombre;
  categorias: Categoria[] = [];
  proveedores: Proveedor[] = [];
  imagen: string = this.data.producto.imagen;
  precio: number = this.data.producto.precio;
  descripcion: string = this.data.producto.descripcion;
  stock: number = this.data.producto.stock;
  categoria?: number = this.data.producto.categoria;
  proveedor?: number = this.data.producto.proveedor;

  categoriaNombre = '';
  proveedorNombre = '';
  snackbar: any;


  getCategoria(){
    for(let i=0; i<this.categorias.length;i++){                
      const nombre = this.categorias.find(n => n.id == this.categoria); 
      if(nombre){
        this.categoriaNombre = nombre.nombre;
        return nombre.nombre;
      }      
    }
    return '';
  }
  getProveedor(){
    for(let i=0; i<this.proveedores.length;i++){                
      const nombre = this.proveedores.find(n => n.id == this.proveedor); 
      if(nombre){
        this.proveedorNombre = nombre.nombre;
        return nombre.nombre;
      }      
    }
    return '';
  }
  getCategoriaNombre(){
    for(let i=0; i<this.categorias.length;i++){                
      const nombre = this.categorias.find(n => n.nombre == this.productoModificado.value.categoria); 
      if(nombre){        
        return nombre.id;
      }      
    }
    return 0;
  }
  getProveedorNombre(){
    for(let i=0; i<this.proveedores.length;i++){                
      const nombre = this.proveedores.find(n => n.nombre == this.productoModificado.value.proveedor); 
      if(nombre){        
        return nombre.id;
      }      
    }
    return 0;
  }



  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarProductoComponent>,private dataProductos: DataProductosService,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto}, private dataCategorias: DataCategoriasService, private _dataProveedores:DataProveedoresService) {      
    
  }

  async ngOnInit(): Promise<void> { 
    console.log(this.data.producto)   
    await this.dataCategorias.obtenerCategorias().toPromise().then(resp => {
      this.categorias = resp;
      this._dataProveedores.getProveedores().subscribe(data => {
        this.proveedores = data;                
        this.productoModificado.setValue({
          id: this.data.producto.id ?? '',
          nombre: this.data.producto.nombre ?? '',
          imagen: this.data.producto.imagen ?? '',
          stock: this.data.producto.stock ?? '',
          precio: this.data.producto.precio ?? '',
          proveedor: this.getProveedor() ?? '',
          categoria: this.getCategoria() ?? '',                  
          descripcion: this.data.producto.descripcion ?? '',
        });
      });
    }).catch(err =>{
      console.error(err);
    });
    
  }

  productoModificado = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.maxLength(10),  Validators.pattern('[0-9]*')]),
    precio: new FormControl(0, [Validators.required, Validators.maxLength(10),  Validators.pattern('^[0-9]+(,[0-9]+)?$')]),
    proveedor: new FormControl('', [Validators.required, ]),
    categoria: new FormControl('', [Validators.required, ]),    
    descripcion: new FormControl('', [Validators.required, ])
  });

  onSubmit() {

    let objToSend = {     
      id: this.data.producto.id,        
      nombre: this.productoModificado.value.nombre,
      imagen: this.productoModificado.value.imagen,
      stock: this.productoModificado.value.stock,
      precio: this.productoModificado.value.precio,
      proveedor: this.getProveedorNombre(),
      categoria: this.getCategoriaNombre(),        
      descripcion: this.productoModificado.value.descripcion      
    } 
    this.dataProductos.modificarProducto(objToSend).toPromise().then(resp =>{
      this.dialogRef.close();
    }).catch(error =>{
      this.snackbar.open('Error al modificar', 'OK', { duration: 3000 });
      console.error(error);
    });
  }
  
  cancelar() {
    this.dialogRef.close();
  }
}
