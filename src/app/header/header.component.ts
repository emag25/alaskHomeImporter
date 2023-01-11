import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataUsuariosService } from '../servicios/dataUsuarios.service';
import { ListenerService } from '../servicios/listener.service';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string = this.loginService.getLoggedUsername();
  active: boolean = this.loginService.getActive();
  rol: number = 0
  matBadge: number = 0;
  color = 'white';

  constructor(private dialog: MatDialog, private router: Router, private loginService: LoginService, private listener: ListenerService, private dataUsuarios: DataUsuariosService) {
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));
    this.listener.customMatBadge.subscribe(matBadge => this.matBadge = matBadge);
  }

  ngOnInit(): void {
  }

  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
  }

  logout() {
    this.loginService.logout();
  }

  irPerfil() {
    this.router.navigate(['/perfil'])
  }

  irAdministracion() {
    this.router.navigate(['/administracion']);
  }

  irCarrito() {
    this.router.navigate(['/carrito']);
  }

  cambiarColor() {
    this.color = "black";
  }

}
