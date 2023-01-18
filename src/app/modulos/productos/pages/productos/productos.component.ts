import { Component, Renderer2,ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataCategoriasService } from './../../core/services/dataCategorias.service';
import { DataProductosService } from './../../core/services/dataProductos.service';
import { LoginService } from '../../../../core/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { DescripcionComponent } from './../../components/descripcion/descripcion.component';
import { MatDialog } from '@angular/material/dialog';
import {ViewChild} from '@angular/core';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  @ViewChild('categoriaSelec') categoriaSelec: ElementRef | undefined;
  showProductDetail = false;
  productId:string | null= null
  valor='0';
    

  protected active: boolean = this.loginService.getActive();
  protected productos = this.dataProductos.getProductos();
  protected categorias = this.dataCategorias.getCategorias();

  constructor(private renderer:Renderer2,private dialog:MatDialog, private route: ActivatedRoute, private router: Router, private dataProductos: DataProductosService, private dataCategorias: DataCategoriasService, protected loginService: LoginService) {
  }
  category:string | null= null;
  public selectedVal: string = '0';


  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {      
      this.productId = params.get('producto');     
      this.category = params.get('categoria');   
             
      if (this.productId) {
        this.onShowDetail(this.productId);
      }  
      if (this.category != null) {
        console.log(this.category);
          
                
        const elemento: any | null = document.getElementById('rol');
        const elemento2: any | null = document.getElementById(this.category+'-button');
        elemento.children[0].children[0].ariaPressed = true;
        console.log(elemento.children[0].children[0].ariaPressed);   
        console.log(elemento2);   
      }      
    })
  }

  public onValChange(val: string) {
    this.selectedVal = val;
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
