import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../login/login.component';
import { ListenerService } from '../servicios/listener.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  username: string = '';
  active: boolean = false;
  matBadge: number = 0;
  color = 'white';

  constructor(private listener: ListenerService, private cookie: CookieService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listener.customState.subscribe(active => this.active = active);
    this.listener.customUsername.subscribe(username => this.username = username);
    this.listener.customMatBadge.subscribe(matBadge => this.matBadge = matBadge);
  }

  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
  }

  logout() {
    this.active = false;
    this.cookie.set('active', 'false');
    this.cookie.set('username', '');
    this.cookie.set('id', '');
    this.router.navigate(['']);
  }

  irPerfil() {
    this.router.navigate(['/perfil']);
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
