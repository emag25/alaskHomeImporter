import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Proveedor } from 'src/app/modulos/proveedores/core/models/proveedor.model';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.css']
})
export class ModificarProveedorComponent implements OnInit {

  id: number = this.data.proveedor.id;
  ruc: string = this.data.proveedor.ruc;
  nombre: string = this.data.proveedor.nombre;
  email: string = this.data.proveedor.email;
  telefono: string = this.data.proveedor.telefono;
  direccion: string = this.data.proveedor.direccion;


  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarProveedorComponent>, @Inject(MAT_DIALOG_DATA) public data: { proveedor: Proveedor }) {
    this.proveedorModificado.setValue({
      ruc: this.data.proveedor.ruc,
      nombre: this.data.proveedor.nombre,
      email: this.data.proveedor.email,
      telefono: this.data.proveedor.telefono,
      direccion: this.data.proveedor.direccion
    });
  }

  ngOnInit(): void {
  }

  proveedorModificado = new FormGroup({
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern('[0-9]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)])

  });

  onSubmit() {

    let objToSend: NavigationExtras = {
      queryParams: {
        id: this.data.proveedor.id,
        ruc: this.data.proveedor.ruc,
        nombre: this.proveedorModificado.value.nombre,
        email: this.proveedorModificado.value.email,
        telefono: this.proveedorModificado.value.telefono,
        direccion: this.proveedorModificado.value.direccion
      },
      skipLocationChange: false,
      fragment: 'top'
    }

    this.dialogRef.close();
    this.redirectTo('/proveedores', objToSend);

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri], { state: { datosProveedor: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }
}
