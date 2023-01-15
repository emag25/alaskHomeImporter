import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  hide = true;
  
  constructor(private router: Router, private dialogRef: MatDialogRef<LoginComponent>, private snackbar: MatSnackBar, private loginService: LoginService) {
  }
  
  ngOnInit(): void {  
  }

  
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
  });


  onSubmit() {

    let txtemail = this.formLogin.value.email ?? '';
    let txtcontrasena = this.formLogin.value.contrasena ?? ''; 
      
    if (this.loginService.login(txtemail, txtcontrasena)) {

      this.dialogRef.close();
      window.open('/productos', '_self');

    } else {

      this.snackbar.open('Usuario o contraseña incorrecta.', 'OK', { duration: 5000 });

    }
      
  }  


  cancelar() {
    this.dialogRef.close();
  }

}