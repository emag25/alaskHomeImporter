import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { SolicitudProveedor } from 'src/app/modulos/proveedores/models/solicitudProveedor';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/services/dataSolicitudProveedor.service';

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
              private _dataProvincias: DataProvinciasService, private _dataSolicitud: DataSolicitudProveedorService) {

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

    let s: SolicitudProveedor = {
      ruc: this.solicitudModificada.value.ruc ?? '',
      nombre: this.solicitudModificada.value.nombre ?? '',
      email: this.solicitudModificada.value.email ?? '',
      telefono: this.solicitudModificada.value.telefono ?? '',
      provincia: {
        id: Number(this.solicitudModificada.value.provincia)
      },
      estado: this.solicitudModificada.value.estado ?? '',
    }

    this._dataSolicitud.editSolicitud(s);

    this.dialogRef.close(); 

  }


  cancelar() {
    this.dialogRef.close();
  }
}
