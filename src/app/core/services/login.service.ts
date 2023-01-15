import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataUsuariosService } from '../../modulos/usuarios/core/services/dataUsuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookie: CookieService, private router: Router, private dataUsuarios: DataUsuariosService) { }
  
  getActive(): boolean {
    return this.cookie.get('active') === 'true';
  }

  
  getLoggedUsername(): string {
    return this.cookie.get('username');
  }


  getLoggedUserId(): number {
    return Number(this.cookie.get('id'));
  }


  login(email: string, contrasena: string): boolean {
    
    if (this.dataUsuarios.findUserbyEmailPass(email, contrasena) !== undefined) {

      let user: any = this.dataUsuarios.findUserbyEmailPass(email, contrasena);
      this.cookie.set('active', 'true');
      this.cookie.set('username', user.nombre + ' ' + user.apellido);
      this.cookie.set('id', user.id.toString());

      return true;

    } else {

      return false;

    }
  }


  logout(): void {

    this.cookie.set('active', 'false');
    this.cookie.set('username', '');
    this.cookie.set('id', '');
    window.open('/inicio', '_self');

  }

}
