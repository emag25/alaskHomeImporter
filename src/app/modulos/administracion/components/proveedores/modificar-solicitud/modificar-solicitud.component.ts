import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { SolicitudProveedor } from 'src/app/modulos/proveedores/models/solicitudProveedor';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/services/dataSolicitudProveedor.service';
import { DialogErrorComponent } from 'src/app/shared/components/dialogError/dialogError.component';
import { DialogExitoComponent } from 'src/app/shared/components/dialogExito/dialogExito.component';

@Component({
  selector: 'app-modificar-solicitud',
  templateUrl: './modificar-solicitud.component.html',
  styleUrls: ['./modificar-solicitud.component.css']
})
export class ModificarSolicitudComponent implements OnInit {

  originalState: string = this.data.solicitud.estado??'';
  ruc: string = this.data.solicitud.ruc;
  nombre: string = this.data.solicitud.nombre;
  email: string = this.data.solicitud.email;
  telefono: string = this.data.solicitud.telefono;
  provincia: string = this.data.solicitud.provincia.nombre??'';
  estado: string = this.data.solicitud.estado??'';
  provincias: Provincia[] = [];


  constructor(private dialogRef: MatDialogRef<ModificarSolicitudComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { solicitud: SolicitudProveedor },
              private _dataProvincias: DataProvinciasService, private _dataSolicitud: DataSolicitudProveedorService,
              private dialog: MatDialog) {

    this.solicitudModificada.setValue({
      ruc: this.data.solicitud.ruc,
      nombre: this.data.solicitud.nombre,
      email: this.data.solicitud.email,
      telefono: this.data.solicitud.telefono,
      provincia: this.data.solicitud.provincia.nombre??'',
      estado: this.data.solicitud.estado
    });
  }


  ngOnInit(): void {

    this._dataProvincias.getProvincias().subscribe(data => {
      this.provincias = data;
    });

  }


  solicitudModificada = new FormGroup({
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern('[0-9]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
    provincia: new FormControl('', [Validators.required]),
    estado: new FormControl(this.data.solicitud.estado, [Validators.required])
  });


  onSubmit() {

    let idProvincia = this.getProvinciaID(this.solicitudModificada.value.provincia ?? '');

    if (idProvincia > 0) {

      let s: SolicitudProveedor = {
        id: this.data.solicitud.id,
        ruc: this.solicitudModificada.value.ruc ?? '',
        nombre: this.solicitudModificada.value.nombre ?? '',
        email: this.solicitudModificada.value.email ?? '',
        telefono: this.solicitudModificada.value.telefono ?? '',
        provincia: {
          id: this.getProvinciaID(this.solicitudModificada.value.provincia ?? ''),
        },
        estado: this.solicitudModificada.value.estado ?? '',
      }

      this._dataSolicitud.editSolicitud(s).subscribe(data => {

        this.dialogRef.close();

        if (data.respuesta === 'EXITO' && s.estado === 'Aprobada') {

          this.dialog.open(DialogExitoComponent, {
            data: { respuesta: 'Solicitud editada. La solicitud ya no aparecerá en esta sección. Ya hemos agregado al nuevo proveedor.' }
          });
        

        } else if (data.respuesta === 'EXITO' && s.estado !== 'Aprobada') {

          this.dialog.open(DialogExitoComponent, {
            data: { respuesta: 'Solicitud editada.' },
            width: '400px'
          });

        } else if (data.respuesta === 'ERROR') {

          this.dialog.open(DialogErrorComponent, {
            data: { respuesta: 'Solicitud no editada. Lamentamos los inconvenientes, intente más tarde.' }
          });

        } else {

          this.dialog.open(DialogErrorComponent, {
            data: { respuesta: data.respuesta = data.respuesta }
          });

        }

      });
    
    } else {

      this.dialog.open(DialogErrorComponent, {
        data: { respuesta: 'Solicitud no editada. Lamentamos los inconvenientes, intente más tarde.'}
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
