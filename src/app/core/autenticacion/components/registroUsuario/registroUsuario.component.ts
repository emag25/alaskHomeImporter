import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registroUsuario',
  templateUrl: './registroUsuario.component.html',
  styleUrls: ['./registroUsuario.component.css'],
  providers: [DataUsuariosService]

})
export class RegistroUsuarioComponent implements OnInit {

  provincias: Provincia[] = []

  constructor(private router: Router, private dialogRef: MatDialogRef<RegistroUsuarioComponent>, private snackBar: MatSnackBar, private _dataProvincias: DataProvinciasService, private dataUsuarios: DataUsuariosService, private http:HttpClient) { }

 async RegistrarUsuario(){
  let servicios = new DataUsuariosService(this.http);
  await servicios.InsertarUsuario(this.registro.value.nombre, this.registro.value.apellido, this.registro.value.direccion,this.registro.value.contraseña,this.registro.value.email, this.registro.value.telefono,this.registro.value.provincia).subscribe((data:any) => {
  console.log(data);
  this.dialogRef.close();


  });

 
  
 }
 
  ngOnInit(): void 
{

    this._dataProvincias.getProvincias().subscribe(data => {
      this.provincias = data;
    });

  }

  registro = new FormGroup({
    apellido: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    contraseña: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(8)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern('[0-9]*')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    provincia: new FormControl('', [Validators.required]),

  });


  async onSubmit() {
    await this.RegistrarUsuario();
    
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
      this.dataUsuarios.register(this.random(20, 90), this.registro.value.nombre ?? '', this.registro.value.apellido ?? '', this.registro.value.telefono ?? '', this.registro.value.email ?? '', this.registro.value.contraseña ?? '', this.registro.value.direccion ?? '', this.registro.value.provincia ?? '', "1");
      console.log(this.dataUsuarios.getlistaUsuarios());
      this.snackBar.open('Registro exitoso!', 'Cerrar', {
        duration: 2000,
      });


    }

  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


}