import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { Proveedor } from '../models/proveedor.model';
import { ModificarProveedorComponent } from '../modificar-proveedor/modificar-proveedor.component';
import { DataProveedoresService } from '../servicios/dataProveedores.service';
import { DataUsuariosService } from '../servicios/dataUsuarios.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  active: boolean = false;
  rol: number = 0;
  dataSource: any = [];
  displayedColumns: string[] = ['ruc', 'nombre', 'email', 'telefono', 'direccion', 'accion']
  datosRecibidos: any;
  nav: any;

  constructor(private router: Router, private dialog: MatDialog, private dataProveedores: DataProveedoresService, private snackbar: MatSnackBar, private cookie: CookieService, private dataUsuarios: DataUsuariosService) {
    
    this.active = this.cookie.get('active') === 'true' ? true : false;
    let id = Number(this.cookie.get('id'));
    this.rol = Number(this.dataUsuarios.getRol(id));  

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;
    
    if (this.datosRecibidos != null) {

      if (this.datosRecibidos.datosProveedor.queryParams.id === undefined) { // Agregar
        let proveedor = new Proveedor(this.random(2222, 9999), this.datosRecibidos.datosProveedor.queryParams.ruc, this.datosRecibidos.datosProveedor.queryParams.nombre, this.datosRecibidos.datosProveedor.queryParams.email, this.datosRecibidos.datosProveedor.queryParams.telefono, this.datosRecibidos.datosProveedor.queryParams.direccion);
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
  openDialogFiltrar() {
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

}
