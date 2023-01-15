import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from './shared/error404/error404.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginGuardian } from './login/loginGuardian';


const routes: Routes = [
  { 
    path: '', 
    component: InicioComponent 
  },
  { 
    path: 'inicio', 
    component: InicioComponent 
  },  
  { 
    path: 'administracion', 
    loadChildren: () => import('./modulos/administracion/administracion-routing.module').then((m) => m.AdministracionRoutingModule), 
    canActivate: [LoginGuardian] },
    { 
      path: 'productos', 
      loadChildren: () => import('./modulos/productos/productos-routing.module').then((m) => m.ProductosRoutingModule),       
    },  
    {  
      path: 'proveedores', 
      loadChildren: () => import('./modulos/proveedores/proveedores-routing.module').then((m) => m.ProveedoresRoutingModule), 
      canActivate: [LoginGuardian] 
    },
    { 
      path: 'usuario', 
      loadChildren: () => import('./modulos/usuarios/usuarios-routing.module').then((m) => m.UsuariosRoutingModule), 
      canActivate: [LoginGuardian] 
    },  
    {  
      path: 'ventas', 
      loadChildren: () => import('./modulos/ventas/ventas-routing.module').then((m) => m.VentasRoutingModule), 
      canActivate: [LoginGuardian] 
    },  
  { 
    path: '**', 
    component: Error404Component },  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
