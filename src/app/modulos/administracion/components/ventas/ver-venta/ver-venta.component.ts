import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ventas } from 'src/app/modulos/ventas/models/ventas.model';

@Component({
  selector: 'app-ver-venta',
  templateUrl: './ver-venta.component.html',
  styleUrls: ['./ver-venta.component.css']
})
export class VerVentaComponent {

  constructor(
    private dialogRef: MatDialogRef<VerVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {venta: Ventas},
    private snackbar: MatSnackBar
  ) {}

}
