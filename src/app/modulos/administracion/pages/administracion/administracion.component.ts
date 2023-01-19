import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUsuariosService } from '../../../../modulos/usuarios/core/services/dataUsuarios.service';
import { LoginService } from '../../../../core/services/login.service';
import { DataProductosService } from 'src/app/modulos/productos/core/services/dataProductos.service';
import { DataProveedoresService } from 'src/app/modulos/proveedores/core/services/dataProveedores.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;
  usuarios: number = 0;
  proveedores: number = 0;
  productos: number = 0;
  ventas: number = 0;

  constructor(private router: Router, private dataUsuarios: DataUsuariosService, protected loginService: LoginService,
              private dataProveedores: DataProveedoresService, private dataProductos: DataProductosService){
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));  
    this.usuarios = this.dataUsuarios.getlistaUsuarios().length;
    this.proveedores = this.dataProveedores.getProveedores().length;
    this.productos = this.dataProductos.getProductos().length;
    this.ventas = 0;
  }

  ngOnInit() {
  }

  irAdminProveedores() {
    this.router.navigate(['administracion/AdminProveedores']);
  }

  irAdminProductos() {
    this.router.navigate(['administracion/AdminProductos']);
  }

  irAdminUsuarios() {
    this.router.navigate(['administracion/AdminUsuarios']);
  }

  irAdminVentas() {
    this.router.navigate(['administracion/AdminVentas']);
  }

}
