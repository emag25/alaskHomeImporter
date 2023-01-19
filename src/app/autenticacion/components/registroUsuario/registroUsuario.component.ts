import { Component, Input, OnInit, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuariosAdministradorComponent } from 'src/app/modulos/administracion/pages/usuarios-administrador/usuarios-administrador.component';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';
import { Usuario } from 'src/app/modulos/usuarios/core/models/usuario.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


interface Provincia {
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-registroUsuario',
  templateUrl: './registroUsuario.component.html',
  styleUrls: ['./registroUsuario.component.css'],
  providers: [DataUsuariosService]

})
export class RegistroUsuarioComponent implements OnInit {
  //users: any[] =  Usuario[] = [
  //  { id:"", nombre: '', apellido: '', email: '', password: '', telefono: '', direccion: '', rol: '' }, ]

  

  provincias: Provincia[] = [
    {value: '0', viewValue: 'Pichincha'},
    {value: '1', viewValue: 'Tungurahua'},
    {value: '2', viewValue: 'Imbabura'},
    {value: '3', viewValue: 'Cotopaxi'},
    {value: '4', viewValue: 'Chimborazo'},
    {value: '5', viewValue: 'Bolívar'},
    {value: '6', viewValue: 'Azuay'},
    {value: '7', viewValue: 'Cañar'},
    {value: '8', viewValue: 'Carchi'},
    {value: '9', viewValue: 'Cotopaxi'},
    {value: '10', viewValue: 'El Oro'},
    {value: '11', viewValue: 'Esmeraldas'},
    {value: '12', viewValue: 'Galápagos'},
    {value: '13', viewValue: 'Los Ríos'},
    {value: '14', viewValue: 'Manabí'},
    {value: '15', viewValue: 'Napo'},
    {value: '16', viewValue: 'Orellana'},
    {value: '17', viewValue: 'Pastaza'},
    {value: '18', viewValue: 'Sucumbíos'},
    {value: '19', viewValue: 'Morona Santiago'},
    {value: '20', viewValue: 'Zamora Chinchipe'},
  ];


  



  
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
    provincia: new FormControl ('',[Validators.required]),
    
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
        provincia: this.registro.value.provincia,
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
          this.dataUsuarios.register(this.random(20,90), this.registro.value.nombre??'', this.registro.value.apellido??'', this.registro.value.telefono??'', this.registro.value.email??'', this.registro.value.contraseña??'', this.registro.value.direccion??'', this.registro.value.provincia??'', "1");
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
    
    

