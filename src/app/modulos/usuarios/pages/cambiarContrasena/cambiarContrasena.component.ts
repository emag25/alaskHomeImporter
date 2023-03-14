import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../../models/usuario.model';
import { DataUsuariosService } from '../../services/dataUsuarios.service';


@Component({
  selector: 'app-cambiarContrasena',
  templateUrl: './cambiarContrasena.component.html',
  styleUrls: ['./cambiarContrasena.component.css'],
  providers: [DataUsuariosService]

})
export class CambiarContrasenaComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CambiarContrasenaComponent>, private dataUsuarios: DataUsuariosService, private snackBar: MatSnackBar, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario }, private http: HttpClient, private cookie: CookieService) { }

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


  async cambiarContrasena() {

    if(this.cambiar.value.ncontraseña !=null && this.cambiar.value.ncontraseña!=undefined){
    let servicios = new DataUsuariosService(this.http);
    let id = this.cookie.get('id');
    let contrasena = this.cookie.get('contrasena');
    let ncontraseña:string='';
     ncontraseña = this.cambiar.value.ncontraseña;
    let vcontraseña = this.cambiar.value.vcontraseña;
    let contraseñaAntigua = this.cambiar.value.contraseña;
    if (contraseñaAntigua == contrasena) {
      if (ncontraseña == vcontraseña) {
        await servicios.EditClaveUsuario(parseInt(id), ncontraseña, 'actualizar_pass').subscribe((data: any) => {
          console.log(data.respuesta);
          console.log(data);
          if (data.respuesta == "EXITO ya") {
            this.snackBar.open('Contraseña actualizada correctamente', 'Cerrar', {
              duration: 2000,
            });
            this.cookie.set('contrasena', ncontraseña);
            this.dialogRef.close();
          } else {
            this.snackBar.open('Error al editar', 'Cerrar', {
              duration: 2000,
            });
          }
        });
          
        } else {
          this.snackBar.open('Las contraseñas deben ser iguales!', 'Cerrar', {
            duration: 2000,
          });
        }
    } else {
        this.snackBar.open('Contraseña actual incorrecta', 'Cerrar', {
          duration: 2000,
        });
      }


    }
  }
  

    changePassword() {

      this.cambiarContrasena();
    }
  }