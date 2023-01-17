import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Usuario } from 'src/app/modulos/usuarios/core/models/usuario.model';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { Data } from '@angular/router';
import { MatLabel } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';


@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.css']
})
export class ModificarUsuarioComponent implements OnInit {
  id: number = this.data.usuario.id;
  rol: string = this.data.usuario.rol;
  nombre: string = this.data.usuario.nombre;
  apellido: string= this.data.usuario.apellido;
  email: string = this.data.usuario.email;
  telefono: string = this.data.usuario.telefono;
  direccion: string = this.data.usuario.direccion;


  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },private dataUsuarios: DataUsuariosService) {
    this.usuarioModificado.setValue({
      rol: this.data.usuario.rol,
      nombre: this.data.usuario.nombre,
      apellido: this.data.usuario.apellido
    });
  }

  ngOnInit(): void {
  }

  usuarioModificado = new FormGroup({
    apellido: new FormControl('', [Validators.required, Validators.maxLength(150),Validators.pattern('[a-zA-Z ]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    rol: new FormControl('', [Validators.required])


  });

  onSubmit() {

    let objToSend: NavigationExtras = {
      queryParams: {
        id: this.data.usuario.id,
        rol: this.usuarioModificado.value.rol,
        nombre: this.usuarioModificado.value.nombre,
        apellido: this.usuarioModificado.value.apellido,
        email: this.data.usuario.email,
        telefono: this.data.usuario.telefono,
        direccion: this.data.usuario.direccion
      },
      skipLocationChange: false,
      fragment: 'top'
    }

    this.dialogRef.close();

   this.redirectTo('/administracion/AdminUsuarios', objToSend);
   

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri], { state: { dataUsuarios: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }
}
