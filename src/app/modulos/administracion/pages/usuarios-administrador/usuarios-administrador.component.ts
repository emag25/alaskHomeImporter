import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginService } from './../../../../core/services/login.service';
import { DataUsuariosService } from './../../../usuarios/core/services/dataUsuarios.service';
import { Usuario } from 'src/app/modulos/usuarios/core/models/usuario.model';
import { ModificarUsuarioComponent } from '../../components/usuarios/modificar-usuario/modificar-usuario.component';

@Component({
  selector: 'app-usuarios-administrador',
  templateUrl: './usuarios-administrador.component.html',
  styleUrls: ['./usuarios-administrador.component.css']
})
export class UsuariosAdministradorComponent {
  active: boolean = this.loginService.getActive();
  rol: number = 0;
  dataSource: any = [];
  displayedColumns: string[] = ['nombre','apellido', 'email', 'password','telefono', 'direccion','rol', 'accion']
  datosRecibidos: any;
  nav: any;

  constructor(private router: Router, private dialog: MatDialog, private dataUsuarios: DataUsuariosService, private snackbar: MatSnackBar, private loginService: LoginService) {
    
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));  

    this.nav = this.router.getCurrentNavigation();
    this.datosRecibidos = this.nav.extras.state;
    
    if (this.datosRecibidos != null) {

      if (this.dataUsuarios.editUsuario(this.datosRecibidos.dataUsuarios.queryParams)) {
        this.snackbar.open('Usuario modificado con éxito', 'OK', { duration: 3000 });
      } else {
        this.snackbar.open('Error al modificar el usuario. Intenta de nuevo.', 'OK', { duration: 7000 });
      }
      
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Usuario>(this.dataUsuarios.getUsuario());
  }


 

  openDialogModificar(usuario: Usuario) {
    this.dialog.open(ModificarUsuarioComponent, {
      data: { usuario: usuario },
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
