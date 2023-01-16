import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ListenerService } from '../core/services/listener.service';
import { LoginService } from '../core/services/login.service';
import { LoginComponent } from '../autenticacion/components/login/login.component';
import { DataUsuariosService } from '../modulos/usuarios/core/services/dataUsuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  active: boolean = this.loginService.getActive();
  rol: number = 0

  matBadge = 0;
  favoritoMB = 0;
  activeMenu = false;

  constructor(private dialog: MatDialog, private router: Router, private loginService: LoginService, private listener: ListenerService, private dataUsuarios: DataUsuariosService) {
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));
    this.listener.customMatBadge.subscribe(matBadge => this.matBadge = matBadge);
    this.listener.customFavoritoMB.subscribe(favoritoMB => this.favoritoMB = favoritoMB);
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
    this.router.navigate(['/usuario/perfil'])
  }

  irAdministracion() {
    this.router.navigate(['/administracion']);
  }

  irCarrito() {
    this.router.navigate(['/ventas']);
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
