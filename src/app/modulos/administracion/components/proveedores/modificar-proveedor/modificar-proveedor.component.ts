import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedor } from 'src/app/modulos/proveedores/models/proveedor.model';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { DataProveedoresService } from 'src/app/modulos/proveedores/services/dataProveedores.service';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';
import { DialogErrorComponent } from 'src/app/shared/components/dialogError/dialogError.component';
import { DialogExitoComponent } from 'src/app/shared/components/dialogExito/dialogExito.component';

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


  constructor(private dialogRef: MatDialogRef<ModificarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { proveedor: Proveedor }, private _dataProvincias: DataProvinciasService,
    private _dataProveedor: DataProveedoresService, public dialog: MatDialog) {
    
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

    let idProvincia = this.getProvinciaID(this.proveedorModificado.value.provincia ?? '');

    if (idProvincia > 0) {

      let p: Proveedor = {
        id: this.data.proveedor.id,
        nombre: this.proveedorModificado.value.nombre ?? '',
        email: this.proveedorModificado.value.email ?? '',
        telefono: this.proveedorModificado.value.telefono ?? '',
        provincia: {
          id: this.getProvinciaID(this.proveedorModificado.value.provincia ?? ''),
        },
        logo: this.proveedorModificado.value.logo ?? ''
      }

      this._dataProveedor.editProveedor(p).subscribe(data => {

        this.dialogRef.close();

        if (data.respuesta === 'EXITO') {

          this.dialog.open(DialogExitoComponent, {
            data: { respuesta: 'Proveedor editado.' },
            width: '400px'
          });

        } else if (data.respuesta === 'ERROR') {

          this.dialog.open(DialogErrorComponent, {
            data: { respuesta: 'Proveedor no editado. Lamentamos los inconvenientes, intente más tarde.' }
          });

        } else {

          this.dialog.open(DialogErrorComponent, {
            data: { respuesta: data.respuesta = data.respuesta }
          });

        }

      });

    } else {

      this.dialog.open(DialogErrorComponent, {
        data: { respuesta: 'Proveedor no editado. Lamentamos los inconvenientes, intente más tarde.' }
      });

    }

  }

  getProvinciaID(nombre: string) {
    let id: number = 0;
    this.provincias.forEach(p => {
      if (p.nombre === nombre) {
        id = p.id;
      }
    });
    return id;
  }

  cancelar() {
    this.dialogRef.close();
  }
}
