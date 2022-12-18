import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../login/login.component';
import { ListenerService } from '../servicios/listener.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  username: string = '';
  nombre: string = '';
  apellido: string = '';
  celular: string = '';
  direccion: string = '';
  email: string = '';



  

  active: boolean = false;
  matBadge: number = 0;

  constructor(private listener: ListenerService, private cookie: CookieService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.listener.customState.subscribe(active => this.active = active);
    this.listener.customUsername.subscribe(username => this.username = username);
    this.listener.customMatBadge.subscribe(matBadge => this.matBadge = matBadge);
  }

  /* ngOnChanges(changes: SimpleChanges) {
    console.log(changes + ' - ONCHANGES');
    this.username = this.cookie.get('username');
    this.active = this.cookie.get('active') === 'true' ? true : false;
  } */

  openDialogSesion(): void {
    this.dialog.open(LoginComponent);
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

  irCarrito() {
    this.router.navigate(['/carrito']);
  }

}
