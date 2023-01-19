import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModificarProductoComponent } from '../../components/productos/modificar-producto/modificar-producto.component';
import { AgregarProductoComponent } from '../../components/productos/agregar-producto/agregar-producto.component';
import { DataUsuariosService } from './../../../usuarios/core/services/dataUsuarios.service';
import { LoginService } from './../../../../core/services/login.service';
import { DataProductosService } from 'src/app/modulos/productos/core/services/dataProductos.service';
import { Producto } from 'src/app/modulos/productos/core/models/producto.model';
import { Proveedor } from 'src/app/modulos/proveedores/core/models/proveedor.model';
import { DataProveedoresService } from 'src/app/modulos/proveedores/core/services/dataProveedores.service';
import { MatSort } from '@angular/material/sort';
import { FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/modulos/productos/core/models/categoria.model';
import { DataCategoriasService } from 'src/app/modulos/productos/core/services/dataCategorias.service';

@Component({
  selector: 'app-productos-administrador',
  templateUrl: './productos-administrador.component.html',
  styleUrls: ['./productos-administrador.component.css']
})
export class ProductosAdministradorComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;
  
  
  categorias: Categoria[] = this.dataCategorias.getCategorias();  
  categoriaMostrar: any =[];
  categoriaMostrarId: any =[];
  proveedores: Proveedor[] = this.dataProveedor.getProveedores();  
  proveedorMostrar: any =[];
  proveedorMostrarId: any =[];

  datosRecibidos: any;
  nav: any;

  dataSource: any = [];      
  displayedColumns: string[] = ['id', 'nombre','categoria', 'proveedor', 'imagen', 'precio', 'stock', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selectFilter: string = 'Id';
  columnasFilter: string[] = ['Id', 'Nombre','Categoria', 'Proveedor', 'Imagen', 'Precio','Stock'];


  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());
      
    // categoriaId: number;
    // proveedorId: number;    
    // cantidad: number;    
    // carrito: boolean;
    // fav: boolean;
    txtProveedor: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtCategoria: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtId: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtNombre: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));  
  txtImagen: FormControl = new FormControl('');
  txtPrecio: FormControl = new FormControl('', Validators.pattern('[0-9,]+[^.]'));
  txtStock: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  

  checkId: boolean = false;  
  checkNombre: boolean = false;
  checkProveedor: boolean = false;
  checkImagen: boolean = false;
  checkPrecio: boolean = false;
  checkStock: boolean = false;
  checkCategoria: boolean = false;

  selectId: boolean = true;
  selectNombre: boolean = true;
  selectProveedor: boolean = true;
  selectImagen: boolean = true;
  selectPrecio: boolean = true;
  selectStock: boolean = true; 
  selectCategoria: boolean = true; 


  constructor(private router: Router, private dialog: MatDialog, private dataProductos: DataProductosService, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private dataCategorias: DataCategoriasService, private dataProveedor: DataProveedoresService) {
    this.rol = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));
    this.getDatosRecibidos();        
  }

  
  ngOnInit(): void {
    // const categoriasProvicional: Categoria[] = this.dataCategorias.getCategorias();      
    this.onResize('');
    this.dataSource = new MatTableDataSource<Producto>(this.dataProductos.getProductos());        
    
    for(let i = 0; i<this.dataSource.filteredData.length;i++){      
      const categoria = this.dataSource.filteredData[i].categoriaId;            
      const nombre = this.categorias.find(n => n.id == categoria); 
      this.categoriaMostrar.push(nombre?.nombre);
    }
    for(let i = 0; i<this.dataSource.filteredData.length;i++){      
      const proveedor = this.dataSource.filteredData[i].proveedorId;            
      const nombre = this.proveedores.find(n => n.id == proveedor); 
      this.proveedorMostrar.push(nombre?.nombre);
    }  
    for(let i = 0; i<this.dataSource.filteredData.length;i++){      
      const categoria = this.dataSource.filteredData[i].categoriaId;            
      const nombre = this.categorias.find(n => n.id == categoria); 
      this.categoriaMostrarId.push(nombre?.id);
    }
    for(let i = 0; i<this.dataSource.filteredData.length;i++){      
      const proveedor = this.dataSource.filteredData[i].proveedorId;            
      const nombre = this.proveedores.find(n => n.id == proveedor); 
      this.proveedorMostrarId.push(nombre?.id);
    }      
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;   
  }

  idGeneral = 0;
  
  getDatosRecibidos() {    
    this.dataSource = new MatTableDataSource<Producto>(this.dataProductos.getProductos());  
    this.categoriaMostrar.length=this.categoriaMostrar.length-this.categoriaMostrar.length;          
    for(let i = 0; i<this.dataSource.filteredData.length;i++){      
      const categoria = this.dataSource.filteredData[i].categoriaId;            
      const nombre = this.categorias.find(n => n.id == categoria); 
      this.categoriaMostrar.push(nombre?.nombre);
    }
    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;

    if (this.datosRecibidos != null) {

      if (this.datosRecibidos.datosProducto.queryParams.id === undefined) { // Agregar
        this.idGeneral = 0;
        for(let i = 0; i<this.categoriaMostrar.length;i++){
          this.idGeneral = this.idGeneral+1;
          console.log(this.idGeneral);        
        }
        this.idGeneral=this.idGeneral+1;
        console.log(this.dataProductos.getProductos.length);        
        let producto = new Producto(this.idGeneral+'', 
                                    this.datosRecibidos.datosProducto.queryParams.nombre, 
                                    this.datosRecibidos.datosProducto.queryParams.descripcion, 
                                    this.datosRecibidos.datosProducto.queryParams.imagen, 
                                    this.datosRecibidos.datosProducto.queryParams.precio,
                                    this.datosRecibidos.datosProducto.queryParams.stock,
                                    1, 
                                    this.datosRecibidos.datosProducto.queryParams.categoriaId, 
                                    this.datosRecibidos.datosProducto.queryParams.proveedorId,
                                    false,
                                    false);
        this.dataProductos.setProducto(producto);
        this.snackbar.open('Producto agregado con éxito', 'OK', { duration: 3000 });

      } else { // Modificar
        if (this.dataProductos.editProducto(this.datosRecibidos.datosProducto.queryParams)) {
          this.dataSource = new MatTableDataSource<Producto>(this.dataProductos.getProductos());  
          this.proveedorMostrar.length = this.proveedorMostrar.length-this.proveedorMostrar.length;
          this.categoriaMostrar.length=this.categoriaMostrar.length-this.categoriaMostrar.length;            
          this.proveedorMostrarId.length = this.proveedorMostrarId.length-this.proveedorMostrarId.length;
          this.categoriaMostrarId.length=this.categoriaMostrarId.length-this.categoriaMostrarId.length;    
          for(let i = 0; i<this.dataSource.filteredData.length;i++){      
            const categoria = this.dataSource.filteredData[i].categoriaId;            
            const nombre = this.categorias.find(n => n.id == categoria); 
            this.categoriaMostrar.push(nombre?.nombre);
          }
          for(let i = 0; i<this.dataSource.filteredData.length;i++){      
            const proveedor = this.dataSource.filteredData[i].proveedorId;            
            const nombre = this.proveedores.find(n => n.id == proveedor); 
            this.proveedorMostrar.push(nombre?.nombre);
          }       
          for(let i = 0; i<this.dataSource.filteredData.length;i++){      
            const categoria = this.dataSource.filteredData[i].categoriaId;            
            const nombre = this.categorias.find(n => n.id == categoria); 
            this.categoriaMostrarId.push(nombre?.id);
          }
          for(let i = 0; i<this.dataSource.filteredData.length;i++){      
            const proveedor = this.dataSource.filteredData[i].proveedorId;            
            const nombre = this.proveedores.find(n => n.id == proveedor); 
            this.proveedorMostrarId.push(nombre?.id);
          }      
          

          this.snackbar.open('Producto modificado con éxito', 'OK', { duration: 3000 });          
        } else {
          this.snackbar.open('Error al modificar el producto. Intenta de nuevo.', 'OK', { duration: 7000 });
        }        
      }
    }          

  }
    


  openDialogModificar(producto: Producto) {
    this.dialog.open(ModificarProductoComponent, {
      data: { producto: producto },
      disableClose: true,
      width: '700px'
    });
  }
  openDialogIngresar() {
    this.dialog.open(AgregarProductoComponent, {      
      disableClose: true,
      width: '700px'
    });
  }

  onResize(event: any) {

    switch (true) {

      case window.matchMedia('(max-width: 600px)').matches || event?.target?.innerWidth <= 600:
        this.columnsToDisplay = ['id', 'accion'];
        this.selectId = true; this.checkId = true;
        this.selectNombre = false; this.checkNombre = false;
        this.selectProveedor = false; this.checkProveedor = false;
        this.selectImagen = false; this.checkImagen = false;
        this.selectPrecio = false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        this.selectCategoria = false; this.checkCategoria = false;
        break;
      
      case window.matchMedia('(max-width: 800px)').matches || event?.target?.innerWidth <= 800:
        this.columnsToDisplay = ['id', 'nombre', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectProveedor = false; this.checkProveedor = false;
        this.selectImagen = false; this.checkImagen = false;
        this.selectPrecio = false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        this.selectCategoria = false; this.checkCategoria = false;
        break;
      
      case window.matchMedia('(max-width: 900px)').matches || event?.target?.innerWidth <= 900:
        this.columnsToDisplay = ['id', 'nombre', 'categoria', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectProveedor = true; this.checkProveedor = false;
        this.selectImagen = false; this.checkImagen = false;
        this.selectPrecio= false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        this.selectCategoria = false; this.checkCategoria = false;
        break;
      
      case window.matchMedia('(max-width: 1000px)').matches || event?.target?.innerWidth <= 1000:
        this.columnsToDisplay = ['id', 'nombre', 'categoria', 'proveedor', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectProveedor = true; this.checkProveedor = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        this.selectCategoria = false; this.checkCategoria = false;
        break;
      
      case window.matchMedia('(max-width: 1134px)').matches || event?.target?.innerWidth <= 1134:
        this.columnsToDisplay = ['id', 'nombre','categoria', 'proveedor', 'imagen', 'precio', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectProveedor = true; this.checkProveedor = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = true; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        this.selectCategoria = false; this.checkCategoria = false;
        break;
      
      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth > 1134:
        this.columnsToDisplay = ['id', 'nombre','categoria', 'proveedor', 'imagen', 'precio', 'stock', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectProveedor = true; this.checkProveedor = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = true; this.checkPrecio = false;
        this.selectStock = true; this.checkStock = false;
        this.selectCategoria = true; this.checkCategoria = false;
        break;      
      
      default:
        this.columnsToDisplay = ['id', 'nombre','categoria', 'proveedor', 'imagen', 'precio', 'stock', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectProveedor = true; this.checkProveedor = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = true; this.checkPrecio = false;
        this.selectStock = true; this.checkStock = false;
        this.selectCategoria = true; this.checkCategoria = false;
        break; 
    }
  }


  delete(id: string) {
    if (this.dataProductos.deleteProducto(id)) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/administracion/AdminProductos']));
      this.snackbar.open('Producto eliminado con éxito', 'OK', { duration: 3000 });
    } else {
      this.snackbar.open('Error al eliminar el producto. Intenta de nuevo.', 'OK', { duration: 7000 });
    }
  }


  onclickColumn(index: number) {   
    if (this.columnsToDisplay.includes(this.displayedColumns[index])) {
      this.removeColumn(index);

    } else { 
      this.addColumn(index);
    }
  }


  addColumn(index: number) {

    let column = this.displayedColumns[index];
    let temp = this.columnsToDisplay;
    this.columnsToDisplay = [];
    
    for (let i = 0; i < this.displayedColumns.length; i++) {
      console.log(this.displayedColumns);
      if (this.displayedColumns[i] === column || temp.includes(this.displayedColumns[i])) {
        this.columnsToDisplay.push(this.displayedColumns[i]);
      }
    }

    if (this.columnsToDisplay.length === 3) {
      this.checkId = false;
      this.checkNombre = false;
      this.checkProveedor = false;
      this.checkImagen = false;
      this.checkPrecio = false;
      this.checkStock = false;
      this.checkCategoria = false;
    }
  }


  removeColumn(index: number) {

    if (this.columnsToDisplay.length === 3) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(this.displayedColumns[index]), 1);
      this.disableColumn(this.columnsToDisplay[0]);
    
    } else if (this.columnsToDisplay.length === 2) {
      this.snackbar.open('Debe mostrar al menos una columna', 'OK', { duration: 3000 });
    
    } else if (this.columnsToDisplay.length > 2) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(this.displayedColumns[index]), 1);
    
    }
  }


  disableColumn(columna: string) {
    switch (columna) {      
      case 'Id':
        this.checkId = true;
        break;
      case 'Nombre':
        this.checkNombre = true;
        break;
      case 'Telefono':
        this.checkProveedor = true;
        break;
      case 'Imagen':
        this.checkImagen = true;
        break;
      case 'Precio':
        this.checkPrecio = true;
        break;
      case 'Stock':
        this.checkStock = true;
        break;
      case 'Categoria':
        this.checkStock = true;
        break;
      default:
        break;
    }
  }


  getFormatedDate(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }


  random(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  onChangeFilter() {        
    this.txtId.setValue('');
    this.txtNombre.setValue('');
    this.txtProveedor.setValue('');
    this.txtImagen.setValue('');
    this.txtPrecio.setValue('');
    this.txtStock.setValue('');
    this.txtCategoria.setValue('');
    this.dataSource.filter = '';   
    this.getCategorias();
    this.getProveedores();
  }
    
  filterById() {           
    this.dataSource.filter = this.txtId.value.trim().toLowerCase();    
    this.getCategorias();
    this.getProveedores();
    this.dataSource.filterPredicate = function (data: any, filter: string) {      
      return data.id.toLocaleLowerCase().includes(filter);      
    }
  }
  filterByNombre() {     
    this.dataSource.filter = this.txtNombre.value.trim().toLowerCase();
    this.getCategorias();
    this.getProveedores();    
    this.dataSource.filterPredicate = function (data: any, filter: string) {      
      return data.nombre.toLocaleLowerCase().includes(filter);      
    }
  }

  filterByProveedor() {    
    if (this.txtProveedor.value !== undefined) {          
      const vari = this.proveedores.find(n => n.nombre.toLowerCase() == this.txtProveedor.value.trim().toLowerCase());        
      if(vari){        
        this.dataSource.filter = vari.id;                
        this.getProveedores(); 
      }else{
        this.dataSource.filter ='';          
      }
    } else {
      this.getProveedores(); 
    }
    this.getCategorias(); 
    this.dataSource.filterPredicate = function (data: any, filter: string) {                
      return data.proveedorId.toString().includes(filter);
    }
  }

  filterByImagen(){         
    this.dataSource.filter = this.txtImagen.value.trim().toLowerCase();
    this.getCategorias();
    this.getProveedores();
    this.dataSource.filterPredicate = function (data: any, filter: string) {      
      return data.imagen.toLocaleLowerCase().includes(filter);
    }
  }
  filterByPrecio() {
    this.dataSource.filter = this.txtPrecio.value.trim().toLowerCase();
    this.getCategorias();
    this.getProveedores();
    this.dataSource.filterPredicate = function (data: any, filter: string) {      
      return data.precio.toString().includes(filter);      
    }
  }

  filterByStock() {         
    this.dataSource.filter = this.txtStock.value.trim().toLowerCase();
    this.getCategorias();
    this.getProveedores();
    this.dataSource.filterPredicate = function (data: any, filter: string) {         
      return data.slock.toString().includes(filter);      
    }
  }

  filterByCategoria() {    
    if (this.txtCategoria.value !== undefined) {
      const vari = this.categorias.find(n => n.nombre.toLowerCase() == this.txtCategoria.value.trim().toLowerCase());       
      if(vari){
        this.dataSource.filter = vari.id;   
        this.getCategorias();              
      }else{
        this.dataSource.filter ='';
      }
    } else {
      this.dataSource.filter = '';
      this.getCategorias();      
    }
    this.getProveedores();
    this.dataSource.filterPredicate = function (data: any, filter: string) {      
      return data.categoriaId.toString().includes(filter);
    }
  }

  getCategorias(){
    this.categoriaMostrar.length=this.categoriaMostrar.length-this.categoriaMostrar.length;            
        for(let i = 0; i<this.dataSource.filteredData.length;i++){      
          const categoria = this.dataSource.filteredData[i].categoriaId;            
          const nombre = this.categorias.find(n => n.id == categoria); 
          this.categoriaMostrar.push(nombre?.nombre);
        }
    this.categoriaMostrarId.length=this.categoriaMostrarId.length-this.categoriaMostrarId.length;      
        for(let i = 0; i<this.dataSource.filteredData.length;i++){      
          const categoria = this.dataSource.filteredData[i].categoriaId;            
          const nombre = this.categorias.find(n => n.id == categoria); 
          this.categoriaMostrarId.push(nombre?.id);
        }
  }
  getProveedores(){
    this.proveedorMostrar.length = this.proveedorMostrar.length-this.proveedorMostrar.length;
        for(let i = 0; i<this.dataSource.filteredData.length;i++){      
          const proveedor = this.dataSource.filteredData[i].proveedorId;            
          const nombre = this.proveedores.find(n => n.id == proveedor); 
          this.proveedorMostrar.push(nombre?.nombre);
        }
    this.proveedorMostrarId.length = this.proveedorMostrarId.length-this.proveedorMostrarId.length;
        for(let i = 0; i<this.dataSource.filteredData.length;i++){      
          const proveedor = this.dataSource.filteredData[i].proveedorId;            
          const nombre = this.proveedores.find(n => n.id == proveedor); 
          this.proveedorMostrarId.push(nombre?.id);
        }
  } 

}

