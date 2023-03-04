import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Proveedor } from 'src/app/modulos/proveedores/models/proveedor.model';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';

@Component({
  selector: 'app-modificar-proveedor',
  templateUrl: './modificar-proveedor.component.html',
  styleUrls: ['./modificar-proveedor.component.css']
})
export class ModificarProveedorComponent implements OnInit {

  id: number = this.data.proveedor.id?? 0;
  ruc: string = this.data.proveedor.ruc?? '';
  nombre: string = this.data.proveedor.nombre;
  email: string = this.data.proveedor.email;
  telefono: string = this.data.proveedor.telefono;
  provincia: string = this.data.proveedor.provincia.nombre?? '';
  logo: string = this.data.proveedor.logo?? '';
  provincias: Provincia[] = [];


  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: Proveedor }, private _dataProvincias: DataProvinciasService) {
    
    this.proveedorModificado.setValue({
      ruc: this.data.proveedor.ruc?? '',
      nombre: this.data.proveedor.nombre,
      email: this.data.proveedor.email,
      telefono: this.data.proveedor.telefono,
      provincia: this.data.proveedor.provincia.nombre?? '',
      logo: this.data.proveedor.logo?? ''
    });
  }

  ngOnInit(): void {

    this._dataProvincias.getProvincias().subscribe(data => {
      this.provincias = data;
    });
    
  }

  proveedorModificado = new FormGroup({
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern('[0-9]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
    provincia: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)])
  });

  onSubmit() {

    let objToSend: NavigationExtras = {
      queryParams: {
        id: this.data.proveedor.id,
        ruc: this.data.proveedor.ruc,
        nombre: this.proveedorModificado.value.nombre,
        email: this.proveedorModificado.value.email,
        telefono: this.proveedorModificado.value.telefono,
        provincia: this.proveedorModificado.value.provincia,
        logo: this.proveedorModificado.value.logo,
        fechaAprobacion: this.data.proveedor.fechaAprobacion,
      },
      skipLocationChange: false,
      fragment: 'top'
    }

    this.dialogRef.close();
    this.redirectTo('/administracion/AdminProveedores', objToSend);

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri], { state: { datosProveedor: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }
}
