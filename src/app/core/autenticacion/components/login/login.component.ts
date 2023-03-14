import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroUsuarioComponent } from '../registroUsuario/registroUsuario.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/shared/services/login.service';
import { HttpClient } from '@angular/common/http';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  hide = true;
  
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private snackbar: MatSnackBar, private loginService: LoginService, private dialog: MatDialog, private http:HttpClient,private cookie: CookieService) {
  }
  
  async VerificarUsuario() {
    let servicios = new DataUsuariosService(this.http); //acceder funciones de dataUsuarios
    console.log(this.formLogin.value.email, this.formLogin.value.contrasena);
    await servicios.VerificarUsuario(this.formLogin.value.email, this.formLogin.value.contrasena ).subscribe((data:any) => {
      console.log(data);
      if (data.length > 0 && data[0].Column1 ==null && data[0].id_usuario > 0) {
        console.log(data[0].id_usuario, data[0].nombre_usuario, data[0].apellido_usuario,data[0].email_usuario, data[0].password_usuario);
        let login= this.loginService.login(data[0].email_usuario, data[0].password_usuario, data[0].nombre_usuario, data[0].id_usuario,data[0].apellido_usuario)
        console.log(login);

      }else{
        alert("Usuario o contraseña incorrectos");
      }
      this.dialogRef.close(); 
      window.open('/inicio', '_self');
 
      });    


}
 
  ngOnInit(): void {  
  }

  
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });


  async onSubmit() {
   await  this.VerificarUsuario();

    


      
  }  

  registroUsuario(){

    this.dialog.open(RegistroUsuarioComponent ,{ disableClose: true, width: '500px' });

  }

  cancelar() {
    this.dialogRef.close();
  }

}