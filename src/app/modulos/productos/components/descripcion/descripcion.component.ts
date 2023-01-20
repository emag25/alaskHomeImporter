import { Component, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/core/autenticacion/components/login/login.component';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { ListenerService } from 'src/app/shared/services/listener.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { DataProductosService } from '../../services/dataProductos.service';



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
  activador = false;
  idUsuario = 0;

  constructor(private DataUsuario:DataUsuariosService, private dialog:MatDialog,private loginService: LoginService,private dialogRef:MatDialogRef<DescripcionComponent>, private dataProductosService:DataProductosService,private listener:ListenerService){
  }  
  ngOnInit(): void {
    this.idUsuario = this.loginService.getLoggedUserId();
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
    this.DataUsuario.addCarrito(this.idUsuario, { id: parseInt(this.producto.id) })

  }
  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.DataUsuario.removeCarrito(1, parseInt(this.producto.id));
  }
  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
  }
}
