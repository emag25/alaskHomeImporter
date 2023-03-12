import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DescripcionComponent } from 'src/app/modulos/productos/components/descripcion/descripcion.component';
import { Producto } from 'src/app/modulos/productos/interfaces/producto.interface';
import { DataProductosService } from 'src/app/modulos/productos/services/dataProductos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  productos: Producto[] = [];
  constructor(private router: Router, private dataProductos: DataProductosService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataProductos.obtenerProductos().toPromise().then(
      resp => {
        console.log(resp);
        this.productos = resp;
      });

  }


  getProductos(id: number) {
    let producto = [];
    for (let i = 0; i < this.productos.length; i++) {
      if(producto.length < 3){
        if(this.productos[i].categoria == id){
          producto.push(this.productos[i])
        }
      }else{
        break;
      }
    }  
    return producto;
  }

openDescripcion(id ?: string) {
  if (id) {
    this.dialog.open(DescripcionComponent, { disableClose: false, width: '700px' }).componentInstance.id = id.toString();
  }
}


irProductos() {
  this.router.navigate(['/productos']);
}
}