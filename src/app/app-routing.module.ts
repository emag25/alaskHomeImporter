import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { Error404Component } from './error404/error404.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginGuardian } from './login/loginGuardian';
import { PerfilComponent } from './perfil/perfil.component';
import { ProductosComponent } from './productos/productos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [LoginGuardian] },
  { path: 'perfil', component: PerfilComponent, canActivate: [LoginGuardian] },
  { path: 'proveedores', component: ProveedoresComponent, canActivate: [LoginGuardian] },
  { path: 'administracion', component: AdministracionComponent, canActivate: [LoginGuardian] },
  { path: '**', component: Error404Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
