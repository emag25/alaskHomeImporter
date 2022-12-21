import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css']
})
export class AgregarProveedorComponent implements OnInit {

  constructor(private router: Router, private dialogRef: MatDialogRef<AgregarProveedorComponent>) { }

  ngOnInit(): void {
  }

  proveedorNuevo = new FormGroup({
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern('[0-9]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
    direccion: new FormControl('', [Validators.required, Validators.maxLength(200)])
    
  });


  onSubmit() {
    let objToSend: NavigationExtras = {
      queryParams: {
        ruc: this.proveedorNuevo.value.ruc,
        nombre: this.proveedorNuevo.value.nombre,
        email: this.proveedorNuevo.value.email,        
        telefono: this.proveedorNuevo.value.telefono,
        direccion: this.proveedorNuevo.value.direccion,
      },
      skipLocationChange: false,
      fragment: 'top'
    };

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
