import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { Proveedor } from 'src/app/modulos/proveedores/core/models/proveedor.model';
import { Provincia } from 'src/app/modulos/proveedores/core/models/provincia.model.ts';
import { DataVentasService } from 'src/app/modulos/ventas/core/services/data-ventas.service';
import { DataProvinciasService } from 'src/app/modulos/proveedores/core/services/dataProvincias.service';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/core/services/dataSolicitudProveedor.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';
import { ModificarProveedorComponent } from '../../components/proveedores/modificar-proveedor/modificar-proveedor.component';
import { Venta } from 'src/app/modulos/ventas/core/models/venta.model';

@Component({
  selector: 'app-ventas-administrador',
  templateUrl: './ventas-administrador.component.html',
  styleUrls: ['./ventas-administrador.component.css']
})
export class VentasAdministradorComponent {
  active: boolean = this.loginService.getActive();
  rol: number = 0;
  
  provincias: Provincia[] = this.dataProvincias.getProvincias();
  datosRecibidos: any;
  nav: any;

  dataSource: any = [];  
  displayedColumns: string[] = ['id', 'cliente', 'email', 'telefono', 'provincia', 'direccion', 'productos', 'total', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selectFilter: string = 'RUC';
  columnasFilter: string[] = ['ID', 'Cliente', 'Email', 'Teléfono', 'Provincia', 'Dirección', 'Total', 'Productos'];
  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());

  txtID: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtCliente: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtEmail: FormControl = new FormControl('');
  txtTelefono: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtProvincia: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtDireccion: FormControl = new FormControl('');
  txtTotal: FormControl = new FormControl('');


  checkID: boolean = false;
  checkCliente: boolean = false;
  checkEmail: boolean = false;
  checkTelefono: boolean = false;
  checkProvincia: boolean = false;
  checkDireccion: boolean = false;
  checkProductos: boolean = false;
  checkTotal: boolean = false;

  selectID: boolean = true;
  selectCliente: boolean = true;
  selectEmail: boolean = true;
  selectTelefono: boolean = true;
  selectProvincia: boolean = true;
  selectDireccion: boolean = true;
  selectProductos: boolean = true;
  selectTotal: boolean = true;


  constructor(private router: Router, private dialog: MatDialog, private dataVentas: DataVentasService, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private dataProvincias: DataProvinciasService, private dataSolicitud: DataSolicitudProveedorService) {
    this.rol = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));
    this.getDatosRecibidos();    
  }

  
  ngOnInit(): void {
    this.onResize('');
    this.dataSource = new MatTableDataSource<Venta>(this.dataVentas.getVentas());
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }


  getDatosRecibidos() {    

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;

    if (this.datosRecibidos != null) {

      if (this.dataVentas.editVenta(this.datosRecibidos.datosProveedor.queryParams)) {
        this.snackbar.open('Venta modificada con éxito', 'OK', { duration: 3000 });
      } else {
        this.snackbar.open('Error al modificar la venta. Intenta de nuevo.', 'OK', { duration: 7000 });
      }
      
    }
  }

  openDialogModificar(venta: Venta) {
    this.dialog.open(ModificarProveedorComponent, {
      data: { venta: venta },
      disableClose: true,
      width: '700px'
    });
  }


  onResize(event: any) {

    switch (true) {

      case window.matchMedia('(max-width: 500px)').matches || event?.target?.innerWidth <= 500:
        this.columnsToDisplay = ['id', 'accion'];
        this.selectID = true; this.checkID = true;
        this.selectCliente = false; this.checkCliente = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectProductos = false; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;
        break;
      
      case window.matchMedia('(max-width: 650px)').matches || event?.target?.innerWidth <= 650:
        this.columnsToDisplay = ['id', 'cliente', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectProductos = false; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;
        break;
      
      case window.matchMedia('(max-width: 800px)').matches || event?.target?.innerWidth <= 800:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectProductos = false; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;
        break;
      
      case window.matchMedia('(max-width: 1000px)').matches || event?.target?.innerWidth <= 1000:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'telefono', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectProductos = false; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;
        break;
      
      case window.matchMedia('(max-width: 1134px)').matches || event?.target?.innerWidth <= 1134:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'telefono', 'provincia', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectDireccion = false; this.checkDireccion = false;    
        this.selectProductos = false; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;    
        break;
      
      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth <= 1300:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'telefono', 'provincia', 'direccion', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectProductos = false; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;
        break;

        case window.matchMedia('(max-width: 1500px)').matches || event?.target?.innerWidth <= 1500:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'telefono', 'provincia', 'direccion', 'productos', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectProductos = true; this.checkProductos = false;
        this.selectTotal = false; this.checkTotal = false;
        break;
        
        case window.matchMedia('(max-width: 1500px)').matches || event?.target?.innerWidth > 1500:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'telefono', 'provincia', 'direccion', 'productos', 'total', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectProductos = true; this.checkProductos = false;
        this.selectTotal = true; this.checkTotal = false;
        break;   
      
      default:
        this.columnsToDisplay = ['id', 'cliente', 'email', 'telefono', 'provincia', 'direccion', 'productos', 'total', 'accion'];
        this.selectID = true; this.checkID = false;
        this.selectCliente = true; this.checkCliente = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectProductos = true; this.checkProductos = false;
        this.selectTotal = true; this.checkTotal = false;
        break;
    }
  }


  delete(id: number) {
    if (this.dataVentas.deleteVenta(id)) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/administracion/AdminVentas']));
      this.snackbar.open('Venta eliminada con éxito', 'OK', { duration: 3000 });
    } else {
      this.snackbar.open('Error al eliminar la venta. Intenta de nuevo.', 'OK', { duration: 7000 });
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

      if (this.displayedColumns[i] === column || temp.includes(this.displayedColumns[i])) {
        this.columnsToDisplay.push(this.displayedColumns[i]);
      }
    }

    if (this.columnsToDisplay.length === 3) {
      this.checkID = false;
      this.checkCliente = false;
      this.checkEmail = false;
      this.checkTelefono = false;
      this.checkProvincia = false;
      this.checkDireccion = false;
      this.checkProductos = false;
      this.checkTotal = false;
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
      case 'id':
        this.checkID = true;
        break;
      case 'cliente':
        this.checkCliente = true;
        break;
      case 'telefono':
        this.checkTelefono = true;
        break;
      case 'email':
        this.checkEmail = true;
        break;
      case 'provincia':
        this.checkProvincia = true;
        break;
      case 'direccion':
        this.checkDireccion = true;
        break;
      case 'productos':
        this.checkProductos = true;
        break;
      case 'total':
        this.checkProductos = true;
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
  

  onChangeFilter() {
    this.txtID.setValue('');
    this.txtCliente.setValue('');
    this.txtTelefono.setValue('');
    this.txtEmail.setValue('');
    this.txtDireccion.setValue('');
    this.txtProvincia.setValue('');
    this.txtTotal.setValue('');
    this.dataSource.filter = '';
  }


  filterByID() {
    this.dataSource.filter = this.txtID.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.id.toString().includes(filter);       
    }
  }

  filterByCliente() {
    this.dataSource.filter = this.txtCliente.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.cliente.toLocaleLowerCase().includes(filter);      
    }
  }

  filterByEmail() {
    this.dataSource.filter = this.txtEmail.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.email.toLocaleLowerCase().includes(filter);
    }
  }

  filterByTelefono(){
    this.dataSource.filter = this.txtTelefono.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.telefono.toLocaleLowerCase().includes(filter);
    }
  }

  filterByProvincia() {
    if (this.txtProvincia.value !== undefined) {
      this.dataSource.filter = this.txtProvincia.value.trim().toLowerCase();   
    } else {
      this.dataSource.filter = '';
    }
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.provincia.toLocaleLowerCase().includes(filter);
    }
  }

  filterByDireccion() {
    this.dataSource.filter = this.txtDireccion.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.direccion.toLocaleLowerCase().includes(filter);      
    }
  }

  filterByTotal() {
    this.dataSource.filter = this.txtTotal.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.total.toString().includes(filter);       
    }
  }
}
