import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataCategoriasService } from '../servicios/dataCategorias.service';
import { DataProductosService } from '../servicios/dataProductos.service';
import { ListenerService } from '../servicios/listener.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

    active: boolean = false;
    protected productos = this.dataProductos.getProductos();
    protected categorias = this.dataCategorias.getCategorias();
  
    constructor(private listener: ListenerService, private router: Router, private cookie: CookieService,
      private dataProductos: DataProductosService, private dataCategorias: DataCategoriasService) {
      this.active = this.cookie.get('active') === 'true' ? true : false;
      this.listener.changeState(this.active, this.cookie.get('username'));
    }
  
    ngOnInit() {   }
  
    irAgregar() {
      this.router.navigate(['/productos-agregar']);  // componente no creado aun
    }
    
    clasificarProductos(categoria: number) {
      this.productos = this.dataProductos.findProductosbyCategoria(categoria);
    }
}
