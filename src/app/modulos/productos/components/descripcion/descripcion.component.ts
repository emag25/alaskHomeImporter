import { Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataProductosService } from '../../core/services/dataProductos.service';
import { ListenerService } from 'src/app/core/services/listener.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginComponent } from 'src/app/autenticacion/components/login/login.component';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';



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
  activador=false;

  constructor(private DataUsuario:DataUsuariosService, private dialog:MatDialog,private loginService: LoginService,private dialogRef:MatDialogRef<DescripcionComponent>, private dataProductosService:DataProductosService,private listener:ListenerService){
  }  
  ngOnInit(): void {
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
    if(this.id){
      if(this.dataProductosService.findProductobyID(this.id)){
        this.activador = true;
      }else{
        this.activador = false;
      }
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
    this.DataUsuario.addCarrito(1, {id: parseInt(this.producto.id), cantidad: this.producto.cantidad, precio: this.producto.precio, total: this.producto.precio * this.producto.cantidad})

  }
  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.DataUsuario.removeCarrito(1, parseInt(this.producto.id));
  }
  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
  }
}
