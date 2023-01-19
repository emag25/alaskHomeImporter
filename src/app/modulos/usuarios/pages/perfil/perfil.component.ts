import { Component, Input, SimpleChanges,OnInit,OnChanges } from '@angular/core';
import { DataUsuariosService } from '../../core/services/dataUsuarios.service';
import { LoginService } from '../../../../core/services/login.service';
import { Usuario } from '../../core/models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { CambiarContrasenaComponent } from '../cambiarContrasena/cambiarContrasena.component';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  username: string = this.loginService.getLoggedUsername();
  active: boolean = this.loginService.getActive();
  @Input() id: number = this.loginService.getLoggedUserId();


  

  
   usuario: any;
    
 

  constructor(private loginService: LoginService, private dataUsuarios: DataUsuariosService, private dialog: MatDialog) {
    // con el ID buscar el usuario en dataUsuarios y asignar los valores a las variables
   
  }

  ngOnInit() {

    this.usuario=this.dataUsuarios.findUserbyID(this.id)

  
  }

  cambiar(){

    this.dialog.open(CambiarContrasenaComponent ,{ disableClose: true, width: '500px',data:{usuario:this.usuario}});

  }


  
  
  
}
  

  

        
  
 

