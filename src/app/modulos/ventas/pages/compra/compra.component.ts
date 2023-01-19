import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Provincia } from 'src/app/modulos/proveedores/core/models/provincia.model.ts';
import { DataProvinciasService } from 'src/app/modulos/proveedores/core/services/dataProvincias.service';
import { DataUsuariosService } from 'src/app/modulos/usuarios/core/services/dataUsuarios.service';
import { LoginService } from 'src/app/core/services/login.service';
import { DataVentasService } from 'src/app/modulos/ventas/core/services/data-ventas.service'
import { DataProductosService } from 'src/app/modulos/productos/core/services/dataProductos.service';
import { Producto } from 'src/app/modulos/productos/core/models/producto.model';
import { Router } from '@angular/router';
import { ListenerService } from 'src/app/core/services/listener.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExitoComponent } from '../../components/dialog-exito/dialog-exito.component';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {

  provincias: Provincia [] = this.dataProvincias.getProvincias();
  idUsuario = 0;
  usuario: any;
  carrito: any;
  producto: any;
  productos: Producto[] = [];
  subtotal = 0;
  iva = 0;
  total = 0;
  carritoMB = 0;

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private dataProvincias: DataProvinciasService,
    private login: LoginService,
    private dataUsuario: DataUsuariosService,
    private dataVentas: DataVentasService,
    private dataProductos: DataProductosService,
    private router: Router,
    private listener: ListenerService,
    private dialog: MatDialog
    ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

      this.idUsuario = this.login.getLoggedUserId();
      this.usuario = this.dataUsuario.findUserbyID(this.idUsuario);
      this.formDatosPersonales.setValue({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        telefono: this.usuario.telefono,
        provincia: 'Guayas',
        direccion: this.usuario.direccion
      });

  }

  ngOnInit() {
    this.listener.customMatBadge.subscribe(carritoMB => this.carritoMB = carritoMB);
    this.idUsuario = this.login.getLoggedUserId();
    this.usuario = this.dataUsuario.findUserbyID(this.idUsuario);
    this.carrito = this.dataUsuario.getCarrito(this.idUsuario);
    this.carrito.forEach((carro: { id: any; }) => {
      this.producto = this.dataProductos.findProductobyID(String(carro.id));
      this.productos.push(this.producto);
    });

    this.productos.forEach(product => {
      this.subtotal += product.cantidad * product.precio;
    });

    this.iva = this.subtotal * 0.12;
    this.total = this.subtotal + this.iva;
  }

    formDatosPersonales = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      apellido: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(150)]),
      telefono: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(9), Validators.pattern('[0-9]*')]),
      provincia: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required, Validators.maxLength(500), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')])
    });

    formDatosTarjeta = new FormGroup({
      tipo: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(20), Validators.pattern('[0-9]*')]),
      mes: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(1), Validators.pattern('^(1[0-2]|[1-9])$')]),
      year: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2), Validators.pattern('^2[3-8]$')]),
      cvv: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('[0-9]*')]),
    });

    deleteProducto(id: string) {
      // console.log("ID RECIBIDO: " + id);
      let obj = this.productos.find(product => product.id == id);
  
      if (obj !== undefined) {
        let index = this.carrito.indexOf(obj);
        // console.log("INDEX: " + index);
        // this.productos.splice(index, 1);
        this.carrito.splice(index, 1);
        // this.subtotal -= obj.precio * obj.cantidad;
        // this.iva = this.subtotal * 0.12;
        // this.total = this.subtotal + this.iva;
        obj.cantidad = 1;
        this.listener.restMatBadge(this.listener.getMatBadge());
        obj.carrito = false;
      }
    }

    onSubmit() {
      let ventas = this.dataVentas.getVentas();
      let last = ventas[ventas.length-1];
      let index = last.id;
      console.log(last);
      console.log('INDEX: ' + index);
      this.dataVentas.setVentas({id: index+1, cliente: this.usuario.nombre +' '+ this.usuario.apellido, email: this.usuario.email, telefono: this.usuario.telefono, provincia: this.usuario.provincia, direccion: this.usuario.direccion, productos: this.productos, total: this.total});

      this.productos.forEach(product => {
        product.stock -= product.cantidad;
        this.deleteProducto(product.id)
      });

      this.dialog.open(DialogExitoComponent, { disableClose: true});

      // this.router.navigate(['/productos']);
      
    }

}
