import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataCategoriasService } from './../../core/services/dataCategorias.service';
import { DataProductosService } from './../../core/services/dataProductos.service';
import { LoginService } from '../../../../core/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { DescripcionComponent } from './../../components/descripcion/descripcion.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  showProductDetail = false;
  productId:string | null= null
    

  protected active: boolean = this.loginService.getActive();
  protected productos = this.dataProductos.getProductos();
  protected categorias = this.dataCategorias.getCategorias();

  constructor(private dialog:MatDialog, private route: ActivatedRoute, private router: Router, private dataProductos: DataProductosService, private dataCategorias: DataCategoriasService, protected loginService: LoginService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {      
      this.productId = params.get('producto');       
      if (this.productId) {
        this.onShowDetail(this.productId);
      }  
    })
     }

  irAgregar() {
    this.router.navigate(['/productos-agregar']);  // componente no creado aun
  }
  
  clasificarProductos(categoria: number) {
    this.productos = this.dataProductos.findProductosbyCategoria(categoria);
  }
  
  productChosen: any;

  onShowDetail(id: string) {        
    
    this.showProductDetail = true;
    
    this.productChosen = this.dataProductos.findProductobyID(id);
    this.openDialogSesion();
    

  }
  openDialogSesion(): void {        
    this.dialog.open(DescripcionComponent, { disableClose: true, width: '700px' }).componentInstance.id = this.productId;
  }

}
