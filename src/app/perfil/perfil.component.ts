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
  active: boolean = false;
  id: number = 0;
  nombre: string = '';
  apellido: string = '';
  celular: string = '';
  direccion: string = '';
  email: string = '';

  constructor(private cookie: CookieService) {
    this.active = this.cookie.get('active') === 'true' ? true : false;
    this.username = this.cookie.get('username');
    this.id = Number(this.cookie.get('id'));
    // usar el servicio dataUsuario para obtener los datos del usuario por medio del id


  }

  ngOnInit(): void {  }

}
