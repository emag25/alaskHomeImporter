import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-proveedores-administrador',
  templateUrl: './proveedores-administrador.component.html',
  styleUrls: ['./proveedores-administrador.component.css']
})
export class ProveedoresAdministradorComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;
  dataSource: any = [];
  displayedColumns: string[] = ['ruc', 'nombre', 'email', 'telefono', 'direccion', 'accion']
  datosRecibidos: any;
  nav: any;

  constructor(private router: Router, private dialog: MatDialog, private dataProveedores: DataProveedoresService, private snackbar: MatSnackBar, private dataUsuarios: DataUsuariosService, private loginService: LoginService) {
    
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));  

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;
    
    if (this.datosRecibidos != null) {

      if (this.datosRecibidos.datosProveedor.queryParams.id === undefined) { // Agregar
        let proveedor = new Proveedor(this.random(2222, 9999), this.datosRecibidos.datosProveedor.queryParams.ruc, this.datosRecibidos.datosProveedor.queryParams.nombre, this.datosRecibidos.datosProveedor.queryParams.email, this.datosRecibidos.datosProveedor.queryParams.telefono, this.datosRecibidos.datosProveedor.queryParams.provincia, this.datosRecibidos.datosProveedor.queryParams.logo);
        this.dataProveedores.setProveedor(proveedor);
      
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


  openDialogAgregar() {
    this.dialog.open(AgregarProveedorComponent, { disableClose: true })
  }


  openDialogModificar(proveedor: Proveedor) {
    this.dialog.open(ModificarProveedorComponent, {
      data: { proveedor: proveedor },
      disableClose: true
    });
  }


  random(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

