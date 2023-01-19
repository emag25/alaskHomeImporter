import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from './../../../../core/services/login.service';
import { DataUsuariosService } from './../../../usuarios/core/services/dataUsuarios.service';
import { Usuario } from 'src/app/modulos/usuarios/core/models/usuario.model';
import { ModificarUsuarioComponent } from '../../components/usuarios/modificar-usuario/modificar-usuario.component';
import { FormControl, Validators } from '@angular/forms';
import { Provincia } from 'src/app/modulos/proveedores/core/models/provincia.model.ts';
import { DataProvinciasService } from 'src/app/modulos/proveedores/core/services/dataProvincias.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-usuarios-administrador',
  templateUrl: './usuarios-administrador.component.html',
  styleUrls: ['./usuarios-administrador.component.css']
})
export class UsuariosAdministradorComponent {
  active: boolean = this.loginService.getActive();
  rol: number = 0;
  selectFilter: string = 'Id';

  provincias: Provincia[] = this.dataProvincias.getProvincias();
  datosRecibidos: any;
  nav: any;

  dataSource: any = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'rol', 'provincia', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  columnasFilter: string[] = ['Id', 'Nombre', 'Apellido', 'Email', 'Telefono', 'Direccion', 'Rol', 'Provincia'];
  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());


  txtId: FormControl = new FormControl(0);
  txtNombre: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtApellido: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtEmail: FormControl = new FormControl('');
  txtTelefono: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtDireccion: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtRol: FormControl = new FormControl('', Validators.required);
  txtProvincia: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));


  checkNombre: boolean = false;
  checkApellido: boolean = false;
  checkEmail: boolean = false;
  checkTelefono: boolean = false;
  checkDireccion: boolean = false;
  checkRol: boolean = false;
  checkProvincia: boolean = false;
  checkId: boolean = false;


  selectId: boolean = true;
  selectNombre: boolean = true;
  selectApellido: boolean = true;
  selectEmail: boolean = true;
  selectTelefono: boolean = true;
  selectDireccion: boolean = true;
  selectRol: boolean = true;
  selectProvincia: boolean = true;



  constructor(private router: Router, private dialog: MatDialog, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private dataProvincias: DataProvinciasService) {
    this.rol = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));
    this.getDatosRecibidos();
  }


  ngOnInit(): void {
    this.onResize('');
    this.dataSource = new MatTableDataSource<Usuario>(this.dataUsuarios.getlistaUsuarios());
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }


  getDatosRecibidos() {

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;

    if (this.datosRecibidos != null) {

      if (this.dataUsuarios.editUsuario(this.datosRecibidos.dataUsuarios.queryParams)) {
        this.snackbar.open('Usuario modificado con éxito', 'OK', { duration: 3000 });
      } else {
        this.snackbar.open('Error al modificar el Usuario. Intenta de nuevo.', 'OK', { duration: 7000 });
      }

    }
  }




  openDialogModificar(usuario: Usuario) {
    this.dialog.open(ModificarUsuarioComponent, {
      data: { usuario: usuario },
      disableClose: true,
      width: '700px'
    });
  }


  onResize(event: any) {

    switch (true) {

      case window.matchMedia('(max-width: 600px)').matches || event?.target?.innerWidth <= 600:
        this.columnsToDisplay = ['id', 'nombre', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = true;
        this.selectApellido = false; this.checkApellido = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectRol = false; this.checkRol = false;
        this.selectProvincia = false; this.checkProvincia = false;

        break;

      case window.matchMedia('(max-width: 800px)').matches || event?.target?.innerWidth <= 800:

        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = false; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectRol = false; this.checkRol = false;
        this.selectProvincia = false; this.checkProvincia = false;
        break;

      case window.matchMedia('(max-width: 900px)').matches || event?.target?.innerWidth <= 900:
        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'email', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = false; this.checkTelefono = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectRol = false; this.checkRol = false;
        this.selectProvincia = false; this.checkProvincia = false;
        break;

      case window.matchMedia('(max-width: 1000px)').matches || event?.target?.innerWidth <= 1000:
        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'email', 'telefono', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectDireccion = false; this.checkDireccion = false;
        this.selectRol = false; this.checkRol = false;
        this.selectProvincia = false; this.checkProvincia = false;
        break;

      case window.matchMedia('(max-width: 1134px)').matches || event?.target?.innerWidth <= 1134:
        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectRol = false; this.checkRol = false;
        this.selectProvincia = false; this.checkProvincia = false;

        break;

      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth > 1134:
        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'rol', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectRol = true; this.checkRol = false;
        this.selectProvincia = false; this.checkProvincia = false;

        break;

      case window.matchMedia('(max-width: 1300px)').matches || event?.target?.innerWidth > 1134:
        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'rol', 'provincia', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectRol = true; this.checkRol = false;
        this.selectProvincia = true; this.checkProvincia = false;

        break;



      default:
        this.columnsToDisplay = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'rol', 'provincia', 'accion'];
        this.selectId = true; this.checkId = false;
        this.selectNombre = true; this.checkNombre = false;
        this.selectApellido = true; this.checkApellido = false;
        this.selectEmail = true; this.checkEmail = false;
        this.selectTelefono = true; this.checkTelefono = false;
        this.selectDireccion = true; this.checkDireccion = false;
        this.selectRol = true; this.checkRol = false;
        this.selectProvincia = true; this.checkProvincia = false;
        break;
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
      this.checkId = false;
      this.checkNombre = false;
      this.checkApellido = false;
      this.checkEmail = false;
      this.checkTelefono = false;
      this.checkDireccion = false;
      this.checkRol = false;
      this.checkProvincia = false;
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
        this.checkId = true;
        break;
      case 'nombre':
        this.checkNombre = true;
        break;
      case 'apellido':
        this.checkApellido = true;
        break;

      case 'telefono':
        this.checkTelefono = true;
        break;
      case 'email':
        this.checkEmail = true;
        break;
      case 'direccion':
        this.checkDireccion = true;
        break;
      case 'rol':
        this.checkRol = true;
        break;

      case 'provincia':
        this.checkProvincia = true;
        break;
      default:
        break;
    }
  }




  onChangeFilter() {

    this.txtId.setValue(0);
    this.txtNombre.setValue('');
    this.txtApellido.setValue('');
    this.txtTelefono.setValue('');
    this.txtEmail.setValue('');
    this.txtDireccion.setValue('');
    this.txtRol.setValue('');
    this.txtProvincia.setValue('');
    this.dataSource.filter = '';
  }

  filterById() {
    this.dataSource.filter = this.txtId.value.trim();
    this.dataSource.filterPredicate = function (data: any, filter: number) {
      return data.id.includes(filter);
    }
  }


  filterByApellido() {
    this.dataSource.filter = this.txtApellido.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.apellido.toLocaleLowerCase().includes(filter);
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

  filterByDireccion() {
    this.dataSource.filter = this.txtDireccion.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.direccion.toLocaleLowerCase().includes(filter);
    }
  }

  filterByRol() {
    if (this.txtRol.value !== undefined) {
      this.dataSource.filter = this.txtRol.value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.rol.toLocaleLowerCase().includes(filter);
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

  convertir(rol: string) {
    if (rol === "1") {

      return "Cliente"
    } else {

      return "Administrador"
    }

  }



}
