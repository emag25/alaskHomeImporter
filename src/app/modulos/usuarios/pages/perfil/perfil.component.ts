import { Component } from '@angular/core';
import { DataUsuariosService } from '../../core/services/dataUsuarios.service';
import { LoginService } from '../../../../core/services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  username: string = this.loginService.getLoggedUsername();
  active: boolean = this.loginService.getActive();
  id: number = this.loginService.getLoggedUserId();
  
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  direccion: string = '';
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private dataUsuarios: DataUsuariosService) {
    // con el ID buscar el usuario en dataUsuarios y asignar los valores a las variables
    
  }

  ngOnInit(): void {  }

}
