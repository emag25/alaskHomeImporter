import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Provincia } from '../../core/models/provincia.model.ts';
import { SolicitudProveedor } from '../../core/models/solicitudProveedor';
import { DataProvinciasService } from '../../core/services/dataProvincias.service';
import { DataSolicitudProveedorService } from '../../core/services/dataSolicitudProveedor.service';
import { DialogExitoComponent } from '../dialogExito/dialogExito.component';

@Component({
  selector: 'app-solicitud-proveedor',
  templateUrl: './solicitud-proveedor.component.html',
  styleUrls: ['./solicitud-proveedor.component.css']
})
export class SolicitudProveedorComponent implements OnInit {

  provincias:Provincia [] = this.dataProvincias.getProvincias();

  constructor(private dialogRef: MatDialogRef<SolicitudProveedorComponent>, private dataProvincias: DataProvinciasService, private dialog: MatDialog, private dataSolicitudProveedor: DataSolicitudProveedorService ) { }

  ngOnInit(): void {
  }

  formSolicitud = new FormGroup({
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern('[0-9]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
    provincia: new FormControl('', [Validators.required])

  });


  onSubmit() {    
    
    this.dataSolicitudProveedor.setSolicitudProveedor(new SolicitudProveedor(
      this.random(3000, 4000),
      this.formSolicitud.value.ruc ?? '',
      this.formSolicitud.value.nombre ?? '',
      this.formSolicitud.value.email ?? '',
      this.formSolicitud.value.telefono ?? '',
      this.formSolicitud.value.provincia ?? '',
      'Por revisar',
      new Date()
    ));

    this.dialogRef.close();
    this.dialog.open(DialogExitoComponent);
  }


  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  cancelar() {
    this.dialogRef.close();
  }

}
