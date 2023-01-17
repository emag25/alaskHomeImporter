import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AgregarProveedorComponent } from '../../components/proveedores/agregar-proveedor/agregar-proveedor.component';
import { ModificarProveedorComponent } from '../../components/proveedores/modificar-proveedor/modificar-proveedor.component';
import { DataUsuariosService } from './../../../usuarios/core/services/dataUsuarios.service';
import { LoginService } from './../../../../core/services/login.service';
import { DataProveedoresService } from 'src/app/modulos/proveedores/core/services/dataProveedores.service';
import { Proveedor } from 'src/app/modulos/proveedores/core/models/proveedor.model';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/core/services/dataSolicitudProveedor.service';
import { MatSort } from '@angular/material/sort';
import { FormControl, Validators } from '@angular/forms';
import { Provincia } from 'src/app/modulos/proveedores/core/models/provincia.model.ts';
import { DataProvinciasService } from 'src/app/modulos/proveedores/core/services/dataProvincias.service';



@Component({
  selector: 'app-proveedores-administrador',
  templateUrl: './proveedores-administrador.component.html',
  styleUrls: ['./proveedores-administrador.component.css']
})
export class ProveedoresAdministradorComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;
  
  provincias: Provincia[] = this.dataProvincias.getProvincias();
  datosRecibidos: any;
  nav: any;

  dataSource: any = [];  
  //nombreColumnas: string[] = ['RUC', 'Nombre', 'Email', 'Teléfono', 'Provincia', 'Fecha de aprobación'];
  displayedColumns: string[] = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'fechaAprobacion', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selectFilter: string = 'RUC';
  columnasFilter: string[] = ['RUC', 'Nombre', 'Email', 'Teléfono', 'Provincia', 'Fecha de aprobación'];
  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());

  txtRuc: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtNombre: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtEmail: FormControl = new FormControl('');
  txtTelefono: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtProvincia: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtFecha: FormControl = new FormControl('');
  /* txtFechaInicio: FormControl = new FormControl('', Validators.pattern('[0-9]{2}-[0-9]{2}-[0-9]{4}'));
  txtFechaFin: FormControl = new FormControl('', Validators.pattern('[0-9]{2}-[0-9]{2}-[0-9]{4}')); */

  checkRuc: boolean = false;
  checkNombre: boolean = false;
  checkEmail: boolean = false;
  checkTelefono: boolean = false;
  checkProvincia: boolean = false;
  checkFecha: boolean = false;

  selectRuc: boolean = true;
  selectNombre: boolean = true;
  selectEmail: boolean = true;
  selectTelefono: boolean = true;
  selectProvincia: boolean = true;
  selectFecha: boolean = true; 


  constructor(private router: Router, private dialog: MatDialog, private dataProveedores: DataProveedoresService, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private dataProvincias: DataProvinciasService, private dataSolicitud: DataSolicitudProveedorService) {
    this.getDatosRecibidos();    
  }

  
  ngOnInit(): void {
    this.onResize('');
    this.dataSource = new MatTableDataSource<Proveedor>(this.dataProveedores.getProveedores());
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }


  getDatosRecibidos() {

    this.rol = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;

    if (this.datosRecibidos != null) {

      if (this.datosRecibidos.datosProveedor.queryParams.id === undefined) { // Agregar
        let proveedor = new Proveedor(this.random(2222, 9999), this.datosRecibidos.datosProveedor.queryParams.ruc, this.datosRecibidos.datosProveedor.queryParams.nombre, this.datosRecibidos.datosProveedor.queryParams.email, this.datosRecibidos.datosProveedor.queryParams.telefono, this.datosRecibidos.datosProveedor.queryParams.provincia, this.datosRecibidos.datosProveedor.queryParams.logo, this.datosRecibidos.datosProveedor.queryParams.fechaAprobacion);
        this.dataProveedores.setProveedor(proveedor);
        this.snackbar.open('Proveedor agregado con éxito', 'OK', { duration: 3000 });

      } else { // Modificar
        if (this.dataProveedores.editProveedor(this.datosRecibidos.datosProveedor.queryParams)) {
          this.snackbar.open('Proveedor modificado con éxito', 'OK', { duration: 3000 });
        } else {
          this.snackbar.open('Error al modificar el proveedor. Intenta de nuevo.', 'OK', { duration: 7000 });
        }
      }
    }

  }


  openDialogAgregar() {
    this.dialog.open(AgregarProveedorComponent, { disableClose: true, width: '700px' });
  }


  openDialogModificar(proveedor: Proveedor) {
    this.dialog.open(ModificarProveedorComponent, {
      data: { proveedor: proveedor },
      disableClose: true,
      width: '700px'
    });
  }


  onResize(event: any) {

    switch (true) {

      case window.matchMedia('(max-width: 600px)').matches || event?.target?.innerWidth <= 600:
        this.columnsToDisplay = ['ruc', 'accion'];
        this.selectRuc = true; this.checkRuc = true;
        this.selectNombre = false; this.checkNombre = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectFecha = false; this.checkFecha = false;
        break;
      
      case window.matchMedia('(max-width: 800px)').matches || event?.target?.innerWidth <= 800:
        this.columnsToDisplay = ['ruc', 'nombre', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectFecha = false; this.checkFecha = false;
        break;
      
      case window.matchMedia('(max-width: 900px)').matches || event?.target?.innerWidth <= 900:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectFecha = false; this.checkFecha = false;
        break;
      
      case window.matchMedia('(max-width: 1000px)').matches || event?.target?.innerWidth <= 1000:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectFecha = false; this.checkFecha = false;
        break;
      
      case window.matchMedia('(max-width: 1134px)').matches || event?.target?.innerWidth <= 1134:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectFecha = false; this.checkFecha = false;        
        break;
      
      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth > 1134:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'fechaAprobacion', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectFecha = true; this.checkFecha = false;
        break;      
      
      default:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'fechaAprobacion', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectFecha = true; this.checkFecha = false;
        break;
    }
  }


  delete(id: number) {
    if (this.dataProveedores.deleteProveedor(id)) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/administracion/AdminProveedores']));
      this.snackbar.open('Proveedor eliminado con éxito', 'OK', { duration: 3000 });
    } else {
      this.snackbar.open('Error al eliminar el proveedor. Intenta de nuevo.', 'OK', { duration: 7000 });
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
      this.checkRuc = false;
      this.checkNombre = false;
      this.checkEmail = false;
      this.checkTelefono = false;
      this.checkProvincia = false;
      this.checkFecha = false;
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
      case 'ruc':
        this.checkRuc = true;
        break;
      case 'nombre':
        this.checkNombre = true;
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
      case 'fechaAprobacion':
        this.checkFecha = true;
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
    this.txtRuc.setValue('');
    this.txtNombre.setValue('');
    this.txtTelefono.setValue('');
    this.txtEmail.setValue('');
    this.txtFecha.setValue('');
    /* this.txtFechaInicio.setValue('');
    this.txtFechaFin.setValue(''); */
    this.txtProvincia.setValue('');
    this.dataSource.filter = '';
  }


  filterByRuc() {
    this.dataSource.filter = this.txtRuc.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.ruc.toLocaleLowerCase().includes(filter);       
    }
  }

  filterByNombre() {
    this.dataSource.filter = this.txtNombre.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.nombre.toLocaleLowerCase().includes(filter);      
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

  filterByFecha() {
    let fecha = this.getFormatedDate(new Date(this.txtFecha.value));
    if (fecha !== '31/12/1969') {
      this.dataSource.filter = fecha.trim();
      this.dataSource.filterPredicate = function (data: any, filter: string) {
        let date = new Date(data.fechaAprobacion);        
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formetedDate = day + '/' + month + '/' + year;
        return formetedDate.includes(filter);
      }
    }else {
      this.dataSource.filter = '';
      this.dataSource.filterPredicate = function (data: any, filter: string) {
        return data.ruc.toLocaleLowerCase().includes(filter);
      }
    }
  }
  
  /* filterByFecha() {  
    
    let fechaInicio = this.getFormatedDate(new Date(this.txtFechaInicio.value));
    let fechaFin = this.getFormatedDate(new Date(this.txtFechaFin.value));

    this.dataSource.filter = fechaInicio.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.fechaAprobacion.toLocaleLowerCase().includes(filter);
    }
  } */

}

