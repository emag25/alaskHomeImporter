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
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-proveedores-administrador',
  templateUrl: './proveedores-administrador.component.html',
  styleUrls: ['./proveedores-administrador.component.css']
})
export class ProveedoresAdministradorComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;
  dataSource: any = [];
  displayedColumns: string[] = ['ruc', 'nombre', 'email', 'telefono', 'direccion', 'fechaAprobacion', 'accion']
  datosRecibidos: any;
  nav: any;

  constructor(private router: Router, private dialog: MatDialog, private dataProveedores: DataProveedoresService,
    private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService,
    private _liveAnnouncer: LiveAnnouncer, private dataSolicitud: DataSolicitudProveedorService) {
  
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));  

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

  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Proveedor>(this.dataProveedores.getProveedores());
  }


  @ViewChild('empTbSort') empTbSort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
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


  delete(id: number) {
    if (this.dataProveedores.deleteProveedor(id)) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/administracion/AdminProveedores']));
      this.snackbar.open('Proveedor eliminado con éxito', 'OK', { duration: 3000 });
    } else {
      this.snackbar.open('Error al eliminar el proveedor. Intenta de nuevo.', 'OK', { duration: 7000 });
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

