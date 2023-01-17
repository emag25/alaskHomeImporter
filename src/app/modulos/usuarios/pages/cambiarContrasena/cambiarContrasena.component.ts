import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../core/models/usuario.model';
import { Data } from '@angular/router';






@Component({
  selector: 'app-cambiarContrasena',
  templateUrl: './cambiarContrasena.component.html',
  styleUrls: ['./cambiarContrasena.component.css'],
  providers: [DataUsuariosService]

})
export class CambiarContrasenaComponent implements OnInit {




  constructor(private dialogRef: MatDialogRef<CambiarContrasenaComponent>, private dataUsuarios: DataUsuariosService, private snackBar: MatSnackBar, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario }) { }

  ngOnInit() {
  }

  cambiar = new FormGroup({
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
    ncontraseña: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),
    vcontraseña: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]),



  });
  cancelar() {
    this.dialogRef.close();
  }

  changePassword() {

    if (this.cambiar.value.contraseña === this.data.usuario.password) {
      if (this.cambiar.value.ncontraseña == this.cambiar.value.vcontraseña) {
        this.dataUsuarios.changePassword(this.cambiar.value.ncontraseña ?? '', this.data.usuario.id);
        console.log(this.dataUsuarios.getlistaUsuarios());
        this.dialogRef.close();
  
        this.snackBar.open('Cambió su contraseña!', 'Cerrar', {
          duration: 2000,
        });
  
      } else {
        this.snackBar.open('Las contraseñas deben ser iguales !', 'Cerrar', {
          duration: 2000,
        });
      }

    } else{

      this.snackBar.open('Contraseña actual incorrecta', 'Cerrar', {
        duration: 2000,
      });



    }

  }
}







