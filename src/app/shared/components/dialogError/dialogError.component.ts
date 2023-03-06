import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogError',
  templateUrl: './dialogError.component.html',
  styleUrls: ['./dialogError.component.css']
})
export class DialogErrorComponent {

  mensaje: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { respuesta: string }) { 
    
    this.mensaje = data.respuesta;

  }

}
