import { Component, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataUsuariosService } from '../servicios/dataUsuarios.service';
import { ListenerService } from '../servicios/listener.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  temp: Usuario = new Usuario(0, '0', '0', '0', '0', '0', '0', '0');
  hide = true;
  active: boolean = false;
  
  constructor(private listener:ListenerService, private cookie: CookieService, private router: Router, private dialogRef: MatDialogRef<LoginComponent>, private dataUsuarios: DataUsuariosService) {
  }
  
  ngOnInit(): void {  
  }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });

  /* 

  getErrorMessage() {

    if (this.contrasena.hasError('required')) {
      return 'Contraseña es requerida';
    }

    if (this.contrasena.hasError('minlength')) {
      return 'Contraseña debe tener al menos 8 caracteres';
    }

    if (this.contrasena.hasError('maxlength')) {
      return 'Contraseña no puede tener mas de 20 caracteres';
    }

    return '';
  }  */


  onSubmit() {

    let txtemail = this.formLogin.value.email ?? '';
    let txtcontrasena = this.formLogin.value.contrasena ?? ''; 
      
    if (this.dataUsuarios.findUserbyEmailPass(txtemail, txtcontrasena) !== undefined) {
      
      let user: Usuario = this.dataUsuarios.findUserbyEmailPass(txtemail, txtcontrasena) ?? this.temp;
      this.active = true;
      this.listener.changeState(this.active, user.nombre + ' ' + user.apellido);
      this.cookie.set('active', 'true');
      this.cookie.set('username', user.nombre + ' ' + user.apellido);
      this.cookie.set('id', user.id.toString());

      this.router.navigate(['/productos']);
      this.dialogRef.close();

    } else {
      alert('Usuario o contraseña incorrecta'); // lanzar un SNACKBAR
    }
      
  }  

}

