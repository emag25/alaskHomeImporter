import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';





@Component({
  selector: 'app-cambiarContrasena',
  templateUrl: './cambiarContrasena.component.html',
  styleUrls: ['./cambiarContrasena.component.css'],
  providers: [DataUsuariosService]

})
export class CambiarContrasenaComponent implements OnInit {

  contraseña = '';
  ncontraseña = '';
  vcontraseña = '';



  constructor(private dialogRef: MatDialogRef<CambiarContrasenaComponent>,private dataUsuarios: DataUsuariosService, private snackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
  }

  cambiar = new FormGroup({
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(8),Validators.minLength(8)]),
    ncontraseña: new FormControl('', [Validators.required, Validators.maxLength(10),Validators.minLength(8)]),
    vcontraseña: new FormControl('', [Validators.required, Validators.maxLength(10),Validators.minLength(8)]),



  });
  cancelar() {
    this.dialogRef.close();
  }

  changePassword() {

   // if(this.contraseña===this.dataUsuarios.getPassword){ } 
    if (this.ncontraseña=== this.vcontraseña){
    this.dataUsuarios.changePassword(this.contraseña, this.ncontraseña);
    console.log(this.dataUsuarios.getlistaUsuarios());
    this.dialogRef.close();

    this.snackBar.open('Cambió su contraseña!', 'Cerrar', {
      duration: 2000,
    });

    }else 
    this.snackBar.open('No se puedo cambiar su contraseña!', 'Cerrar', {
        duration: 2000,
      });




  

  }
}

