import { Component, Input, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuariosAdministradorComponent } from 'src/app/modulos/administracion/pages/usuarios-administrador/usuarios-administrador.component';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';
import { Usuario } from 'src/app/modulos/usuarios/core/models/usuario.model';





@Component({
  selector: 'app-registroUsuario',
  templateUrl: './registroUsuario.component.html',
  styleUrls: ['./registroUsuario.component.css'],
  providers: [DataUsuariosService]

})
export class RegistroUsuarioComponent implements OnInit {
  //users: any[] =  Usuario[] = [
  //  { id:"", nombre: '', apellido: '', email: '', password: '', telefono: '', direccion: '', rol: '' }, ]

  
  

  
  constructor(private router: Router, private dialogRef: MatDialogRef<RegistroUsuarioComponent>, private snackBar: MatSnackBar,private dialog: MatDialog ,private dataUsuarios: DataUsuariosService ) { }

  ngOnInit(): void {
  }

  registro = new FormGroup({
    apellido: new FormControl('', [Validators.required, Validators.maxLength(150),Validators.pattern('[a-zA-Z ]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(10),Validators.minLength(8)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    
  });


  onSubmit() {
    let objToSend: NavigationExtras = {
      queryParams: {
        apellido: this.registro.value.apellido,
        nombre: this.registro.value.nombre,
        email: this.registro.value.email,  
        contraseña: this.registro.value.contraseña,              
        telefono: this.registro.value.telefono,
        direccion: this.registro.value.direccion,
      },
      skipLocationChange: false,
      fragment: 'top'
    };

    this.dialogRef.close();
    this.redirectTo('/login', objToSend);

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri], { state: { datosProveedor: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }

  register() {
    if (this.registro.valid) {
      // push new user to the array
          this.dataUsuarios.register(this.random(20,90), this.registro.value.nombre??'', this.registro.value.apellido??'', this.registro.value.telefono??'', this.registro.value.email??'', this.registro.value.contraseña??'', this.registro.value.direccion??'', "1");
          console.log(this.dataUsuarios.getlistaUsuarios());
      this.snackBar.open('Registro exitoso!', 'Cerrar', {
        duration: 2000,
      });
  

    } 

  }

  random(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


 /* register() {
    this.dataUsuarios.register(this.id, this.nombre, this.apellido, this.telefono, this.email, this.password, this.direccion, this.rol);
    this.registro.reset();
    this.snackBar.open('Registro exitoso!', 'Cerrar', {
      duration: 2000,
    });  


    }*/
    }
    
    

