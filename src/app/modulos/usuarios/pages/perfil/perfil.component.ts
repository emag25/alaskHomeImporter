import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services/login.service';
import { DataUsuariosService } from '../../services/dataUsuarios.service';
import { CambiarContrasenaComponent } from '../cambiarContrasena/cambiarContrasena.component';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  username: string = this.loginService.getLoggedUsername();
  active: boolean = this.loginService.getActive();
  id: number = this.loginService.getLoggedUserId();

  usuario: any;

  constructor(private loginService: LoginService, private dataUsuarios: DataUsuariosService, private dialog: MatDialog) {   
  }

  ngOnInit() {
    this.usuario=this.dataUsuarios.findUserbyID(this.id)
  }

  cambiar(){
    this.dialog.open(CambiarContrasenaComponent ,{ disableClose: true, width: '500px',data:{usuario:this.usuario}});
  }

}
  

  

        
  
 

