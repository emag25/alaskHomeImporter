import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogExito',
  templateUrl: './dialogExito.component.html',
  styleUrls: ['./dialogExito.component.css']
})
export class DialogExitoComponent {

  mensaje: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { respuesta: string }) {

    this.mensaje = data.respuesta;

  }

}
