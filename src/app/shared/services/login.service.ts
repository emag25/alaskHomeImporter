import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private cookie: CookieService, private dataUsuarios: DataUsuariosService) { }
  
  getActive(): boolean {
    return this.cookie.get('active') === 'true';
  }

  
  getLoggedUsername(): string {
    return this.cookie.get('username');
  }


  getLoggedUserId(): number {
    return Number(this.cookie.get('id'));
  }



  login(email: string|undefined|null, contrasena: string|undefined|null, nombre: string|undefined|null, id: number, apellido: string|undefined|null): boolean {
    
    if (email !=null && email !=undefined && contrasena !=null && contrasena !=undefined && nombre !=null && nombre !=undefined && id !=null && id !=undefined && apellido !=null && apellido !=undefined) {



      this.cookie.set('active', 'true');
      this.cookie.set('username', nombre + ' ' + apellido);
      this.cookie.set('id', id.toString());
      this.cookie.set('contrasena',contrasena);
      return true;
    } else {

      return false;

    }
  }


  logout(): void {

    this.cookie.set('active', 'false');
    this.cookie.set('username', '');
    this.cookie.set('id', '');
    this.cookie.set('contrasena','');
    window.open('/inicio', '_self');

  }

}
