import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DescripcionComponent } from 'src/app/modulos/productos/components/descripcion/descripcion.component';
import { Producto } from 'src/app/modulos/productos/models/producto.model';
import { DataProductosService } from 'src/app/modulos/productos/services/dataProductos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router: Router, private dataProductos: DataProductosService, private dialog: MatDialog) {
  
  }

  getProductos(id: number) {
    let completo = this.dataProductos.findProductosbyCategoria(id);
    let producto = [];
    
    for (let i = 0; i < completo.length; i++) {
      producto.push(completo[i]);

      if (i == 2) {
        break;
      }
    }

    return producto;
  }

  openDescripcion(id: string) {
    this.dialog.open(DescripcionComponent, { disableClose: false, width: '700px' }).componentInstance.id = id.toString();
  }

  ngOnInit() { }

  irProductos() {
    this.router.navigate(['/productos']);
  }
}