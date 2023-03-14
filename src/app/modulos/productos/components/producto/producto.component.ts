import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/core/autenticacion/components/login/login.component';
import { DataUsuariosService } from 'src/app/modulos/usuarios/services/dataUsuarios.service';
import { ListenerService } from 'src/app/shared/services/listener.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { DataProductosService } from '../../services/dataProductos.service';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input() producto: Producto ={
    id: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    stock: 0,
    cantidad: 0,
    categoria: 0,
    proveedor: 0,
    carrito: false,
    fav: false,
  };
  @Input() categoriaNombre:string | null= null;
  
  active: boolean = this.loginService.getActive();

  @Output() showProduct = new EventEmitter<string>();

  onShowDetail() {
    this.showProduct.emit(this.producto.id);
  }
  // Variables de carrito
  carritoMB = 0;
  iconCarrito = "_shopping_cart";

  // Variables de favoritos
  favoritoMB = 0;

  idUsuario = 0;
  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private dataProductos: DataProductosService,
    private router: Router,
    private listener: ListenerService,
    private DataUsuario: DataUsuariosService
  ) { }

  ngOnInit() {    
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
    this.listener.customFavoritoMB.subscribe(favoritoMB => this.favoritoMB = favoritoMB);
    this.idUsuario = this.loginService.getLoggedUserId();
  }

  irEditar(id: number) {
    this.router.navigate(['/peliculas-editar',id]); // componente no creado aun
  }
    

  accionCarrito() {
    if(this.active){
      if (!this.producto.carrito) {        
        this.addCarrito();
      }
      else {
        this.removeCarrito();
      }
    }else this.openDialogSesion();
    
  }

  addCarrito() {
    this.listener.addMatBadge(this.listener.getMatBadge());
    this.DataUsuario.addCarrito(this.idUsuario, {id: parseInt(this.producto.id!)})

  }

  removeCarrito() {
    this.listener.restMatBadge(this.listener.getMatBadge());
    this.DataUsuario.removeCarrito(this.idUsuario, parseInt(this.producto.id!));
  }

  // Controlador de agregar o eliminar favorito
  accionFavorito() {    
    if(this.active){      
      if (!this.producto.fav) {
        this.addFavorito();
      }
      else {
        this.removeFavorito();
      }
    }else this.openDialogSesion();
    
  }

  // Agregar favorito
  addFavorito() {
    this.listener.addFavoritoMB(this.listener.getFavoritoMB());
    console.log(this.producto.id!)    
    this.DataUsuario.addFavorito(this.idUsuario, {id: parseInt(this.producto.id!)})
  }

  // Eliminar favorito
  removeFavorito() {
    this.listener.removeFavoritoMB(this.listener.getFavoritoMB());    
    this.DataUsuario.removeFavorito(this.idUsuario, parseInt(this.producto.id!));
  }

  openDialogSesion(): void {
    this.dialog.open(LoginComponent, { disableClose: true, width: '500px' });
  }

}