import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataUsuariosService } from '../servicios/dataUsuarios.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  active: boolean = false;
  rol: number = 0;

  constructor(private router: Router, private cookie: CookieService, private dataUsuarios: DataUsuariosService) {
    
    this.active = this.cookie.get('active') === 'true' ? true : false;
    let id = Number(this.cookie.get('id'));
    this.rol = Number(this.dataUsuarios.getRol(id));    
  }

  ngOnInit() {
  }

  irAdminProveedores() {
    this.router.navigate(['/proveedores']);
  }

  irAdminProductos() {
    this.router.navigate(['/AdminProductos']);
  }

  irAdminUsuarios() {
    this.router.navigate(['/AdminUsuarios']);
  }

  irAdminVentas() {
    this.router.navigate(['/AdminVentas']);
  }

}
