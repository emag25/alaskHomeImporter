import { Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataProductosService } from '../../core/services/dataProductos.service';
import { ListenerService } from 'src/app/core/services/listener.service';


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.css']
})
export class DescripcionComponent implements OnInit{
  @Input() id: string | null = null;
  producto: any;
  carritoMB = 0;
  iconCarrito = "_shopping_cart";

  constructor(private dialogRef:MatDialogRef<DescripcionComponent>, private dataProductosService:DataProductosService,private listener:ListenerService){
  }  
  ngOnInit(): void {
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
    if(this.id){
      this.producto = this.dataProductosService.findProductobyID(this.id);
    }
  }

  cancelar() {
    this.dialogRef.close();
  }


  accionCarrito() {
    if (this.producto.carrito) {
      this.addCarrito();
    }
    else {
      this.removeCarrito();
    }
  }
  addCarrito() {
    this.listener.addMatBadge(this.listener.getMatBadge());
  }

  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
  }
}
