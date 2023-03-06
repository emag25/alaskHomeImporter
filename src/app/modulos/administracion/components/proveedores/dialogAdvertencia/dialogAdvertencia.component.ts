import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataProveedoresService } from 'src/app/modulos/proveedores/services/dataProveedores.service';
import { DataSolicitudProveedorService } from 'src/app/modulos/proveedores/services/dataSolicitudProveedor.service';
import { DialogErrorComponent } from 'src/app/shared/components/dialogError/dialogError.component';
import { DialogExitoComponent } from 'src/app/shared/components/dialogExito/dialogExito.component';

@Component({
  selector: 'app-dialogAdvertencia',
  templateUrl: './dialogAdvertencia.component.html',
  styleUrls: ['./dialogAdvertencia.component.css']
})
export class DialogAdvertenciaComponent implements OnInit {

  id: number = this.data.id;
  nombre: string = this.data.nombre;
  mensaje: string = this.data.mensaje;
  origen: string = this.data.origen;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, nombre: string, mensaje: string, origen: string },
              private dialogRef: MatDialogRef<DialogAdvertenciaComponent>,
              private _dataSolicitudes: DataSolicitudProveedorService,
              private dialog: MatDialog,
              private _dataPoveedores: DataProveedoresService) { }

  ngOnInit() {
  }

  delete() {

    if (this.origen === 'solicitudes') {
      this.eliminarSolicitud();
    } else if (this.origen === 'proveedores') {
      this.eliminarProveedor();
    }
    
  }



  eliminarProveedor() {

    this._dataPoveedores.deleteProveedor(this.id).subscribe(data => {
        
      this.dialogRef.close();

      if (data.respuesta === 'EXITO') {

        this.dialog.open(DialogExitoComponent, {
          data: { respuesta: 'Proveedor eliminado.' },
          width: '400px'
        });

      } else if (data.respuesta === 'ERROR') {

        this.dialog.open(DialogErrorComponent, {
          data: { respuesta: 'Proveedor no eliminado. Lamentamos los inconvenientes, intente más tarde' }
        });

      }

    });

  }



  eliminarSolicitud() {

    this._dataSolicitudes.deleteSolicitud(this.id).subscribe(data => {

      this.dialogRef.close();

      if (data.respuesta === 'EXITO') {

        this.dialog.open(DialogExitoComponent, {
          data: { respuesta: 'Solicitud eliminada.' },
          width: '400px'
        });

      } else if (data.respuesta === 'ERROR') {

        this.dialog.open(DialogErrorComponent, {
          data: { respuesta: 'Solicitud no eliminada. Lamentamos los inconvenientes, intente más tarde' }
        });

      }

    });
  }



  cancelar() {
    this.dialogRef.close();
  }


}
