import { Component, Input, SimpleChanges,OnInit,OnChanges } from '@angular/core';
import { DataUsuariosService } from '../../core/services/dataUsuarios.service';
import { LoginService } from '../../../../core/services/login.service';
import { Usuario } from '../../core/models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  username: string = this.loginService.getLoggedUsername();
  active: boolean = this.loginService.getActive();
  @Input() id: number = this.loginService.getLoggedUserId();


  

  
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  direccion: string = '';
  email: string = '';
  password: string = '';
  @Input() usuario: any;
    
 

  constructor(private loginService: LoginService, private dataUsuarios: DataUsuariosService) {
    // con el ID buscar el usuario en dataUsuarios y asignar los valores a las variables
   
  }

  ngOnInit() {

    this.usuario=this.dataUsuarios.findUserbyID(this.id)

  
  }

  
  
  
}
  

  

        
  
 

