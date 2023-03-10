import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/modulos/proveedores/models/proveedor.model';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { SolicitudProveedor } from 'src/app/modulos/proveedores/models/solicitudProveedor';
import { DataProveedoresService } from 'src/app/modulos/proveedores/services/dataProveedores.service';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/services/dataSolicitudProveedor.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ModificarSolicitudComponent } from '../../components/proveedores/modificar-solicitud/modificar-solicitud.component';

@Component({
  selector: 'app-solicitud-proveedor-admin',
  templateUrl: './solicitud-proveedor-admin.component.html',
  styleUrls: ['./solicitud-proveedor-admin.component.css']
})
export class SolicitudProveedorAdminComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;

  provincias: Provincia[] = this.dataProvincias.getProvincias();
  datosRecibidos: any;
  nav: any;

  dataSource: any = [];
  displayedColumns: string[] = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'estado', 'fechaEnvio', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  selectFilter: string = 'RUC';
  columnasFilter: string[] = ['RUC', 'Nombre', 'Email', 'Teléfono', 'Provincia', 'Estado', 'Fecha de aprobación'];
  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());

  txtRuc: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtNombre: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtEmail: FormControl = new FormControl('');
  txtTelefono: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtProvincia: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtEstado: FormControl = new FormControl('');
  txtFecha: FormControl = new FormControl('');

  checkRuc: boolean = false;
  checkNombre: boolean = false;
  checkEmail: boolean = false;
  checkTelefono: boolean = false;
  checkProvincia: boolean = false;
  checkEstado: boolean = false;
  checkFecha: boolean = false;

  selectRuc: boolean = true;
  selectNombre: boolean = true;
  selectEmail: boolean = true;
  selectTelefono: boolean = true;
  selectProvincia: boolean = true;
  selectEstado: boolean = true;
  selectFecha: boolean = true;


  constructor(private router: Router, private dataSolicitudes: DataSolicitudProveedorService, private dialog:MatDialog, private dataProveedores: DataProveedoresService, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private dataProvincias: DataProvinciasService) {
    this.rol = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));
    this.getDatosRecibidos();
  }


  ngOnInit(): void {
    this.onResize('');
    this.dataSource = new MatTableDataSource<SolicitudProveedor>(this.dataSolicitudes.getSolicitudesProveedores());
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }


  getDatosRecibidos() {

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;

    if (this.datosRecibidos != null) {

      if (this.datosRecibidos.datosSolicitud.queryParams.estado === 'Aprobado') { // Agregar Proveedor

        this.dataSolicitudes.deleteSolicitudProveedor(this.datosRecibidos.datosSolicitud.queryParams.id);
        let proveedor = new Proveedor(this.datosRecibidos.datosSolicitud.queryParams.id,
          this.datosRecibidos.datosSolicitud.queryParams.ruc,
          this.datosRecibidos.datosSolicitud.queryParams.nombre,
          this.datosRecibidos.datosSolicitud.queryParams.email,
          this.datosRecibidos.datosSolicitud.queryParams.telefono,
          this.datosRecibidos.datosSolicitud.queryParams.provincia, '',
          new Date());
        this.dataProveedores.setProveedor(proveedor);
        this.snackbar.open('Proveedor agregado con éxito', 'OK', { duration: 3000 });

      } else { // Modificar Solicitud

        console.log(this.dataSolicitudes.getSolicitudesProveedores())
        if (this.dataSolicitudes.editSolicitudProveedor(this.datosRecibidos.datosSolicitud.queryParams)) {
          console.log(this.datosRecibidos.datosSolicitud.queryParams);
          console.log(this.dataSolicitudes.getSolicitudesProveedores())
          this.snackbar.open('Solicitud modificada con éxito', 'OK', { duration: 3000 });

        } else {
          this.snackbar.open('Error al modificar la solicitud. Intenta de nuevo.', 'OK', { duration: 7000 });
        }
      }
    }

  }


  setColor(estado: string) {
    if (estado === 'Por revisar'){
      return '#ffbeb5';
    } else {
      return '#fff1a8';
    }
  }


  irProveedores() {
    this.router.navigate(['administracion/AdminProveedores']);
  }


  openDialogModificar(solicitud: SolicitudProveedor) {
    this.dialog.open(ModificarSolicitudComponent, {
      data: { solicitud: solicitud },
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
        this.selectEstado = false; this.checkEstado = false;
        this.selectFecha = false; this.checkFecha = false;
        break;

      case window.matchMedia('(max-width: 800px)').matches || event?.target?.innerWidth <= 800:
        this.columnsToDisplay = ['ruc', 'nombre', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectEstado = false; this.checkEstado = false;
        this.selectFecha = false; this.checkFecha = false;
        break;

      case window.matchMedia('(max-width: 920px)').matches || event?.target?.innerWidth <= 920:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectEstado = false; this.checkEstado = false;
        this.selectFecha = false; this.checkFecha = false;
        break;

      case window.matchMedia('(max-width: 1075px)').matches || event?.target?.innerWidth <= 1075:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = false; this.checkProvincia = false;
        this.selectEstado = false; this.checkEstado = false;
        this.selectFecha = false; this.checkFecha = false;
        break;

      case window.matchMedia('(max-width: 1175px)').matches || event?.target?.innerWidth <= 1175:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectEstado = false; this.checkEstado = false;
        this.selectFecha = false; this.checkFecha = false;
        break;
      
      case window.matchMedia('(max-width: 1290px)').matches || event?.target?.innerWidth <= 1290:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'estado', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectEstado = true; this.checkEstado = false;
        this.selectFecha = false; this.checkFecha = false;
        break;

      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth > 1280:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'estado', 'fechaEnvio', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectEstado = true; this.checkEstado = false;
        this.selectFecha = true; this.checkFecha = false;
        break;

      default:
        this.columnsToDisplay = ['ruc', 'nombre', 'email', 'telefono', 'provincia', 'estado', 'fechaEnvio', 'accion'];
        this.selectRuc = true; this.checkRuc = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectProvincia = true; this.checkProvincia = false;
        this.selectEstado = true; this.checkEstado = false;
        this.selectFecha = true; this.checkFecha = false;
        break;
    }
  }


  delete(id: number) {
    if (this.dataSolicitudes.deleteSolicitudProveedor(id)) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/administracion/AdminProveedores/solicitudes']));
      this.snackbar.open('Solicitud eliminada con éxito', 'OK', { duration: 3000 });
    } else {
      this.snackbar.open('Error al eliminar la solicitud. Intenta de nuevo.', 'OK', { duration: 7000 });
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
      this.checkEstado = false;
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
      case 'estado':
        this.checkEstado = true;
        break;
      case 'fechaEnvio':
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


  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  onChangeFilter() {
    this.txtRuc.setValue('');
    this.txtNombre.setValue('');
    this.txtTelefono.setValue('');
    this.txtEmail.setValue('');
    this.txtFecha.setValue('');
    this.txtEstado.setValue('');
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

  filterByTelefono() {
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

  filterByEstado() {
    console.log(this.txtEstado.value)
    if (this.txtEstado.value !== undefined) {
      this.dataSource.filter = this.txtEstado.value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.estado.toLocaleLowerCase().includes(filter);
    }
  }

  filterByFecha() {
    let fecha = this.getFormatedDate(new Date(this.txtFecha.value));
    if (fecha !== '31/12/1969') {
      this.dataSource.filter = fecha.trim();
      this.dataSource.filterPredicate = function (data: any, filter: string) {
        let date = new Date(data.fechaEnvio);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let formetedDate = day + '/' + month + '/' + year;
        return formetedDate.includes(filter);
      }
    } else {
      this.dataSource.filter = '';
      this.dataSource.filterPredicate = function (data: any, filter: string) {
        return data.ruc.toLocaleLowerCase().includes(filter);
      }
    }
  }

}

