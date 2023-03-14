import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Usuario,User } from 'src/app/modulos/usuarios/models/usuario.model';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {

  id: number|undefined;
  rol: string|undefined;
  nombre: string|undefined;
  apellido: string|undefined;
  email: string|undefined;
  telefono: string|undefined;
  direccion: string|undefined;

  


  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data: { usuario: User },private dataUsuarios: DataUsuariosService,private http: HttpClient) {
    this.id = this.data.usuario.id_usuario;
    this.rol= this.data.usuario.rol_usuario;
    this.nombre = this.data.usuario.nombre_usuario;
    this.apellido= this.data.usuario.apellido_usuario;
    this.email= this.data.usuario.email_usuario;
    this.telefono= this.data.usuario.telefono_usuario;
    this.direccion = this.data.usuario.direccion_usuario;
  
    
    
    
  }

  ngOnInit(): void {
  }

  usuarioModificado = new FormGroup({
    apellido: new FormControl('', [Validators.required, Validators.maxLength(150),Validators.pattern('[a-zA-Z ]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    rol: new FormControl('', [ Validators.required]),

  });

  async ModificarRol() {
    let roles = this.usuarioModificado.value.rol=="1"? "Cliente": "Administrador";
    let servicios = new DataUsuariosService(this.http); //acceder funciones de dataUsuarios
    await servicios.EditRolUsuario(this.id, roles,'actualizar_rol' ).subscribe((data:any) => {
      console.log(data);

    });



  }

  onSubmit() {

    this.ModificarRol();
    window.location.reload();
    this.dialogRef.close();

   

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri], { state: { dataUsuarios: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }
}
