import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataCategoriasService } from '../servicios/dataCategorias.service';
import { DataProductosService } from '../servicios/dataProductos.service';
import { LoginService } from '../servicios/login.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  protected active: boolean = this.loginService.getActive();
  protected productos = this.dataProductos.getProductos();
  protected categorias = this.dataCategorias.getCategorias();

  constructor( private router: Router, private dataProductos: DataProductosService, private dataCategorias: DataCategoriasService, protected loginService: LoginService) {
  }

  ngOnInit() {   }

  irAgregar() {
    this.router.navigate(['/productos-agregar']);  // componente no creado aun
  }
  
  clasificarProductos(categoria: number) {
    this.productos = this.dataProductos.findProductosbyCategoria(categoria);
  }

}
