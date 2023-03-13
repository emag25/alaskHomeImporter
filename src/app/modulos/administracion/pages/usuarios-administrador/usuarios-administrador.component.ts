import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User, Usuario } from 'src/app/modulos/usuarios/models/usuario.model';
import { ModificarUsuarioComponent } from '../../components/usuarios/modificar-usuario/modificar-usuario.component';
import { FormControl, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-usuarios-administrador',
  templateUrl: './usuarios-administrador.component.html',
  styleUrls: ['./usuarios-administrador.component.css']
})
export class UsuariosAdministradorComponent {
  active: boolean = this.loginService.getActive();
  rol_usuario: number = 0;
  selectFilter: string = 'id_usuario';

  datosRecibidos: any;
  nav: any;

  dataSource: any = [];
  displayedColumns: string[] = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'direccion_usuario', 'rol_usuario', 'provincia_usuario', 'accion'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  columnasFilter: string[] = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'direccion_usuario', 'rol_usuario', 'provincia_usuario'];
  minDate = new Date(2000, 1, 1);
  maxDate = new Date(Date.now());

  txtId: FormControl = new FormControl(Validators.required, Validators.pattern('[0-9]*'));
  txtNombre: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtApellido: FormControl = new FormControl('', Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*'));
  txtEmail: FormControl = new FormControl('');
  txtTelefono: FormControl = new FormControl('', Validators.pattern('[0-9]*'));
  txtDireccion: FormControl = new FormControl('');
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



  constructor(private router: Router, private dialog: MatDialog, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService, private _dataProvincias: DataProvinciasService, private http: HttpClient) {
    this.rol_usuario = Number(this.dataUsuarios.getRol(this.loginService.getLoggedUserId()));
    this.getDatosRecibidos();
  }
  usuarios:User[]=[]; //array de usuarios

  async obtenerUsuario(){ //se ejecuta en segundo plano
    let servicios = new DataUsuariosService(this.http); //acceder funciones de dataUsuarios
    await servicios.GetUsuarios().subscribe((data:User[]) => {
      this.usuarios = data;
      console.log("Hola",this.usuarios);

    });
    console.log("Hola",this.usuarios);
  }
  ngOnInit(): void { //carga todos los datos apenas se carga la pagina luego el constructor posteriormete ngChanges se ejecuta cuando hay cambios en el componente
    this.obtenerUsuario();
    
    this.onResize('');
    this.dataSource = new MatTableDataSource<User>(this.usuarios);
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'accion'];
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

        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'accion'];
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'accion'];
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'accion'];
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'direccion_usuario', 'accion'];
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'direccion_usuario', 'rol_usuario', 'accion'];
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'direccion_usuario', 'rol_usuario', 'provincia_usuario', 'accion'];
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
        this.columnsToDisplay = ['id_usuario', 'nombre_usuario', 'apellido_usuario', 'email_usuario', 'telefono_usuario', 'direccion_usuario', 'rol_usuario', 'provincia_usuario', 'accion'];
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
      case 'id_usuario':
        this.checkId = true;
        break;
      case 'nombre_usuario':
        this.checkNombre = true;
        break;
      case 'apellido_usuario':
        this.checkApellido = true;
        break;

      case 'telefono_usuario':
        this.checkTelefono = true;
        break;
      case 'email_usuario':
        this.checkEmail = true;
        break;
      case 'direccion_usuario':
        this.checkDireccion = true;
        break;
      case 'rol_usuario':
        this.checkRol = true;
        break;

      case 'provincia_usuario':
        this.checkProvincia = true;
        break;
      default:
        break;
    }
  }




  onChangeFilter() {

    this.txtId.setValue('');
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
    this.dataSource.filterPredicate = function (data: any, filter:string) {
      return data.id_usuario.toString().includes(filter);
    }
  }


  filterByApellido() {
    this.dataSource.filter = this.txtApellido.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.apellido_usuario.toLocaleLowerCase().includes(filter);
    }
  }

  filterByNombre() {
    this.dataSource.filter = this.txtNombre.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.nombre_usuario.toLocaleLowerCase().includes(filter);
    }
  }

  filterByEmail() {
    this.dataSource.filter = this.txtEmail.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.email_usuario.toLocaleLowerCase().includes(filter);
    }
  }

  filterByTelefono() {
    this.dataSource.filter = this.txtTelefono.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.telefono_usuario.toLocaleLowerCase().includes(filter);
    }
  }

  filterByDireccion() {
    this.dataSource.filter = this.txtDireccion.value.trim().toLowerCase();
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.direccion_usuario.toLocaleLowerCase().includes(filter);
    }
  }

  filterByRol() {
    if (this.txtRol.value !== undefined) {
      this.dataSource.filter = this.txtRol.value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.rol_usuario.toLocaleLowerCase().includes(filter);
    }
  }


  filterByProvincia() {
    if (this.txtProvincia.value !== undefined) {
      this.dataSource.filter = this.txtProvincia.value.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
    this.dataSource.filterPredicate = function (data: any, filter: string) {
      return data.provincia_usuario.toLocaleLowerCase().includes(filter);
    }


  }

  convertir(rol_usuario: string) {
    if (rol_usuario === "1") {
      return "Cliente"
    } else {
      return "Administrador"
    }
  }

}
