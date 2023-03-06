import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Provincia } from '../../models/provincia.model.ts';
import { SolicitudProveedor } from '../../models/solicitudProveedor';
import { DataProvinciasService } from '../../services/dataProvincias.service';
import { DataSolicitudProveedorService } from '../../services/dataSolicitudProveedor.service';
import { DialogErrorComponent } from '../../../../shared/components/dialogError/dialogError.component';
import { DialogExitoComponent } from '../../../../shared/components/dialogExito/dialogExito.component';

@Component({
  selector: 'app-solicitud-proveedor',
  templateUrl: './solicitud-proveedor.component.html',
  styleUrls: ['./solicitud-proveedor.component.css']
})
export class SolicitudProveedorComponent implements OnInit {

  provincias:Provincia [] = [];

  constructor(private dialogRef: MatDialogRef<SolicitudProveedorComponent>, private _dataProvincias: DataProvinciasService,
              private dialog: MatDialog, private _dataSolicitudProveedor: DataSolicitudProveedorService) { }

  ngOnInit(): void {

    this._dataProvincias.getProvincias().subscribe(data => {
      this.provincias = data;
    });
    
  }

  formSolicitud = new FormGroup({
    ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13), Validators.pattern('[0-9]*')]),
    nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
    provincia: new FormControl('', [Validators.required])

  });


  onSubmit() {    

    let s: SolicitudProveedor = {
      ruc: this.formSolicitud.value.ruc ?? '',
      nombre: this.formSolicitud.value.nombre ?? '',
      email: this.formSolicitud.value.email ?? '',
      telefono: this.formSolicitud.value.telefono ?? '',
      provincia: {
        id: Number(this.formSolicitud.value.provincia)
      }
    }

    this.dialogRef.close();

    this._dataSolicitudProveedor.setSolicitud(s).subscribe(data => {

      if (data.respuesta === 'EXITO') {

        this.dialog.open(DialogExitoComponent, {
          data: { respuesta: 'Solicitud enviada. Nos pondremos en contacto contigo.' }
        });

      } else if (data.respuesta === 'ERROR') {

        this.dialog.open(DialogErrorComponent, {
          data: { respuesta: 'Solicitud no enviada. Lamentamos los inconvenientes, intente más tarde' }
        });
        
      } else {
        
        this.dialog.open(DialogErrorComponent, {
          data: { respuesta: data.respuesta = data.respuesta }
        });
        
      }

    });

    

  }

  cancelar() {
    this.dialogRef.close();
  }

}
