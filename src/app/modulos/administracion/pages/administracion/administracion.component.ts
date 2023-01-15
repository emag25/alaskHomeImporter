import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataUsuariosService } from '../../../../modulos/usuarios/core/services/dataUsuarios.service';
import { LoginService } from '../../../../core/services/login.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  active: boolean = this.loginService.getActive();
  rol: number = 0;

  constructor(private router: Router, private dataUsuarios: DataUsuariosService, protected loginService: LoginService) {
    this.rol = Number(this.dataUsuarios.getRol(loginService.getLoggedUserId()));    
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
