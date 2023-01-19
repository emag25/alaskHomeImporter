import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { Provincia } from 'src/app/modulos/proveedores/models/provincia.model.ts';
import { SolicitudProveedor } from 'src/app/modulos/proveedores/models/solicitudProveedor';
import { DataProvinciasService } from 'src/app/modulos/proveedores/services/dataProvincias.service';

@Component({
  selector: 'app-modificar-solicitud',
  templateUrl: './modificar-solicitud.component.html',
  styleUrls: ['./modificar-solicitud.component.css']
})
export class ModificarSolicitudComponent implements OnInit {

  originalState: string = this.data.solicitud.estado;
  ruc: string = this.data.solicitud.ruc;
  nombre: string = this.data.solicitud.nombre;
  email: string = this.data.solicitud.email;
  telefono: string = this.data.solicitud.telefono;
  provincia: string = this.data.solicitud.provincia;
  estado: string = this.data.solicitud.estado;
  provincias: Provincia[] = this.dataProvincias.getProvincias();


  constructor(private router: Router, private dialogRef: MatDialogRef<ModificarSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { solicitud: SolicitudProveedor }, private dataProvincias: DataProvinciasService) {

    this.solicitudModificada.setValue({
      ruc: this.data.solicitud.ruc,
      nombre: this.data.solicitud.nombre,
      email: this.data.solicitud.email,
      telefono: this.data.solicitud.telefono,
      provincia: this.data.solicitud.provincia,
      estado: this.data.solicitud.estado
    });
  }

  ngOnInit(): void {
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

    let objToSend: NavigationExtras = {
      queryParams: {
        id: this.data.solicitud.id,
        ruc: this.solicitudModificada.value.ruc,
        nombre: this.solicitudModificada.value.nombre,
        email: this.solicitudModificada.value.email,
        telefono: this.solicitudModificada.value.telefono,
        provincia: this.solicitudModificada.value.provincia,
        estado: this.solicitudModificada.value.estado,
        fechaEnvio: this.data.solicitud.fechaEnvio,
      },
      skipLocationChange: false,
      fragment: 'top'
    }

    this.dialogRef.close();
    this.redirectTo('/administracion/AdminProveedores/solicitudes', objToSend);

  }

  redirectTo(uri: string, objToSend: NavigationExtras) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { state: { datosSolicitud: objToSend } }));
  }

  cancelar() {
    this.dialogRef.close();
  }
}
