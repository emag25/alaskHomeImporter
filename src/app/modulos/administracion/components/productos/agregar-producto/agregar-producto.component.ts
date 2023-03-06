import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Categoria } from 'src/app/modulos/productos/models/categoria.model';
import { DataCategoriasService } from 'src/app/modulos/productos/services/dataCategorias.service';
import { Proveedor } from 'src/app/modulos/proveedores/models/proveedor.model';
import { DataProveedoresService } from 'src/app/modulos/proveedores/services/dataProveedores.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  

  constructor(private router: Router, private dialogRef: MatDialogRef<AgregarProductoComponent>,private dataCategorias: DataCategoriasService, private _dataProveedores:DataProveedoresService) { }


  ngOnInit(): void {

    this._dataProveedores.getProveedores().subscribe(data => {
      this.proveedores = data;
    });

  }

  categorias: Categoria[] = this.dataCategorias.getCategorias();
  proveedores: Proveedor[] = [];
  categoriaNombre = '';
  proveedorNombre = '';


  getCategoriaNombre(){
    for(let i=0; i<this.categorias.length;i++){                
      const nombre = this.categorias.find(n => n.nombre == this.productoNuevo.value.categoriaId); 
      if(nombre){        
        return nombre.id;
      }      
    }
    return 0;
  }
  getProveedorNombre(){
    for(let i=0; i<this.proveedores.length;i++){                
      const nombre = this.proveedores.find(n => n.nombre == this.productoNuevo.value.proveedorId); 
      if(nombre){        
        return nombre.id;
      }      
    }
    return 0;
  }

  productoNuevo = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    stock: new FormControl(0, [Validators.required, Validators.maxLength(10),  Validators.pattern('[0-9]*')]),
    precio: new FormControl(0, [Validators.required, Validators.maxLength(10),  Validators.pattern('^[0-9]+(,[0-9]+)?$')]),
    proveedorId: new FormControl('', [Validators.required, ]),
    categoriaId: new FormControl('', [Validators.required, ]),
    descripcion: new FormControl('', [Validators.required, ]),
    
  });


  onSubmit() {
    let objToSend: NavigationExtras = {
      queryParams: {
        nombre: this.productoNuevo.value.nombre,
        imagen: this.productoNuevo.value.imagen,
        stock: this.productoNuevo.value.stock,
        precio: this.productoNuevo.value.precio,
        proveedorId: this.getProveedorNombre(),
        categoriaId: this.getCategoriaNombre(),
        descripcion:this.productoNuevo.value.precio
      },
      skipLocationChange: false,
      fragment: 'top'
    };

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
