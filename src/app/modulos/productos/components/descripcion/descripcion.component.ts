import { Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataProductosService } from '../../core/services/dataProductos.service';
import { ListenerService } from 'src/app/core/services/listener.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginComponent } from 'src/app/autenticacion/components/login/login.component';


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
  active: boolean = this.loginService.getActive();

  constructor(private dialog:MatDialog,private loginService: LoginService,private dialogRef:MatDialogRef<DescripcionComponent>, private dataProductosService:DataProductosService,private listener:ListenerService){
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
    if(this.active){
      if (this.producto.carrito) {
        this.addCarrito();
      }
      else {
        this.removeCarrito();
      }
    }else this.openDialogSesion();
    
  }
  addCarrito() {
    this.listener.addMatBadge(this.listener.getMatBadge());
  }

  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
  }
  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
  }
}
