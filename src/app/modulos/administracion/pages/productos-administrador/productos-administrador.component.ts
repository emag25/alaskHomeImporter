import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModificarProveedorComponent } from '../../components/proveedores/modificar-proveedor/modificar-proveedor.component';
import { DataUsuariosService } from './../../../usuarios/core/services/dataUsuarios.service';
import { LoginService } from './../../../../core/services/login.service';
import { DataProductosService } from 'src/app/modulos/productos/core/services/dataProductos.service';
import { Producto } from 'src/app/modulos/productos/core/models/producto.model';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/core/services/dataSolicitudProveedor.service';
import { MatSort } from '@angular/material/sort';
import { FormControl, Validators } from '@angular/forms';
import { Provincia } from 'src/app/modulos/proveedores/core/models/provincia.model.ts';
import { DataProvinciasService } from 'src/app/modulos/proveedores/core/services/dataProvincias.service';

@Component({
  selector: 'app-productos-administrador',
  templateUrl: './productos-administrador.component.html',
  styleUrls: ['./productos-administrador.component.css']
})
export class ProductosAdministradorComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;
  
  
  provincias: Provincia[] = this.dataProvincias.getProvincias();
  datosRecibidos: any;
  nav: any;

  dataSource: any = [];  
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'imagen', 'precio', 'stock', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selectFilter: string = 'Id';
  columnasFilter: string[] = ['Id', 'Nombre', 'Descripcion', 'Imagen', 'Precio', 'Stock'];
  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());
      
    // categoriaId: number;
    // proveedorId: number;    
    // cantidad: number;    
    // carrito: boolean;
    // fav: boolean;

  txtId: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtNombre: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtDescripcion: FormControl = new FormControl('');
  txtImagen: FormControl = new FormControl('');
  txtPrecio: FormControl = new FormControl('', Validators.pattern('[0-9,]+[^.]'));
  txtStock: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  

  checkId: boolean = false;
  checkNombre: boolean = false;
  checkDescripcion: boolean = false;
  checkImagen: boolean = false;
  checkPrecio: boolean = false;
  checkStock: boolean = false;

  selectId: boolean = true;
  selectNombre: boolean = true;
  selectDescripcion: boolean = true;
  selectImagen: boolean = true;
  selectPrecio: boolean = true;
  selectStock: boolean = true; 


  constructor(private router: Router, private dialog: MatDialog, private dataProductos: DataProductosService, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private dataProvincias: DataProvinciasService, private dataSolicitud: DataSolicitudProveedorService) {
    this.rol = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));
    this.getDatosRecibidos();    
  }

  
  ngOnInit(): void {
    this.onResize('');
    this.dataSource = new MatTableDataSource<Producto>(this.dataProductos.getProductos());
    console.log(this.dataSource);
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }


  getDatosRecibidos() {    

    // this.nav = this.router.getCurrentNavigation();
    // this.datosRecibidos = this.nav.extras.state;

    // if (this.datosRecibidos != null) {

    //   if (this.datosRecibidos.datosProveedor.queryParams.id === undefined) { // Agregar
    //     let producto = new Proveedor(this.random(2222, 9999), this.datosRecibidos.datosProveedor.queryParams.ruc, this.datosRecibidos.datosProveedor.queryParams.nombre, this.datosRecibidos.datosProveedor.queryParams.email, this.datosRecibidos.datosProveedor.queryParams.telefono, this.datosRecibidos.datosProveedor.queryParams.provincia, this.datosRecibidos.datosProveedor.queryParams.logo, this.datosRecibidos.datosProveedor.queryParams.fechaAprobacion);
    //     this.dataProveedores.setProveedor(producto);
    //     this.snackbar.open('Proveedor agregado con éxito', 'OK', { duration: 3000 });

    //   } else { // Modificar
    //     if (this.dataProveedores.editProveedor(this.datosRecibidos.datosProveedor.queryParams)) {
    //       this.snackbar.open('Proveedor modificado con éxito', 'OK', { duration: 3000 });
    //     } else {
    //       this.snackbar.open('Error al modificar el proveedor. Intenta de nuevo.', 'OK', { duration: 7000 });
    //     }
    //   }
    // }

  }
  


  openDialogModificar(producto: Producto) {
    // this.dialog.open(ModificarProveedorComponent, {
    //   data: { proveedor: proveedor },
    //   disableClose: true,
    //   width: '700px'
    // });
  }


  onResize(event: any) {

    switch (true) {

      case window.matchMedia('(max-width: 600px)').matches || event?.target?.innerWidth <= 600:
        this.columnsToDisplay = ['id', 'accion'];
        this.selectId = true; this.checkId = true;
        this.selectNombre = false; this.checkNombre = false;
        this.selectDescripcion = false; this.checkDescripcion = false;
        this.selectImagen = false; this.checkImagen = false;
        this.selectPrecio = false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        break;
      
      case window.matchMedia('(max-width: 800px)').matches || event?.target?.innerWidth <= 800:
        this.columnsToDisplay = ['id', 'nombre', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectDescripcion = false; this.checkDescripcion = false;
        this.selectImagen = false; this.checkImagen = false;
        this.selectPrecio = false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        break;
      
      case window.matchMedia('(max-width: 900px)').matches || event?.target?.innerWidth <= 900:
        this.columnsToDisplay = ['id', 'nombre', 'descripcion', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectDescripcion = true; this.checkDescripcion = false;
        this.selectImagen = false; this.checkImagen = false;
        this.selectPrecio= false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        break;
      
      case window.matchMedia('(max-width: 1000px)').matches || event?.target?.innerWidth <= 1000:
        this.columnsToDisplay = ['id', 'nombre', 'descripcion', 'imagen', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectDescripcion = true; this.checkDescripcion = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = false; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        break;
      
      case window.matchMedia('(max-width: 1134px)').matches || event?.target?.innerWidth <= 1134:
        this.columnsToDisplay = ['id', 'nombre', 'descripcion', 'imagen', 'precio', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectDescripcion = true; this.checkDescripcion = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = true; this.checkPrecio = false;
        this.selectStock = false; this.checkStock = false;
        break;
      
      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth > 1134:
        this.columnsToDisplay = ['id', 'nombre', 'descripcion', 'imagen', 'precio', 'stock', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectDescripcion = true; this.checkDescripcion = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = true; this.checkPrecio = false;
        this.selectStock = true; this.checkStock = false;
        break;      
      
      default:
        this.columnsToDisplay = ['id', 'nombre', 'descripcion', 'imagen', 'precio', 'stock', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectDescripcion = true; this.checkDescripcion = false;
        this.selectImagen = true; this.checkImagen = false;
        this.selectPrecio = true; this.checkPrecio = false;
        this.selectStock = true; this.checkStock = false;
        break;
    }
  }


  delete(id: number) {
    // if (this.dataProductos.deleteProducto(id)) {
    //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //   this.router.navigate(['/administracion/AdminProveedores']));
    //   this.snackbar.open('Proveedor eliminado con éxito', 'OK', { duration: 3000 });
    // } else {
    //   this.snackbar.open('Error al eliminar el proveedor. Intenta de nuevo.', 'OK', { duration: 7000 });
    // }
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
      this.checkDescripcion = false;
      this.checkImagen = false;
      this.checkPrecio = false;
      this.checkStock = false;
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
        this.checkDescripcion = true;
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
    this.txtDescripcion.setValue('');
    this.txtImagen.setValue('');
    this.txtPrecio.setValue('');
    this.txtStock.setValue('');
    this.dataSource.filter = '';
  }
    
  filterById() {
    this.dataSource.filter = this.txtId.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.id.toLocaleLowerCase().includes(filter);      
    }
  }
  filterByNombre() {
    this.dataSource.filter = this.txtNombre.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.nombre.toLocaleLowerCase().includes(filter);      
    }
  }

  filterByDescripcion() {
    this.dataSource.filter = this.txtDescripcion.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.descripcion.toLocaleLowerCase().includes(filter);
    }
  }

  filterByImagen(){
    this.dataSource.filter = this.txtImagen.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.imagen.toLocaleLowerCase().includes(filter);
    }
  }
  filterByPrecio() {
    this.dataSource.filter = this.txtPrecio.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.precio.toLocaleLowerCase().includes(filter);      
    }
  }

  filterByStock() {
    this.dataSource.filter = this.txtStock.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.slock.toLocaleLowerCase().includes(filter);      
    }
  }
  

}

