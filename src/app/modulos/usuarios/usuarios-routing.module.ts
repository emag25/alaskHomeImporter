import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContrasenaComponent } from './pages/cambiarContrasena/cambiarContrasena.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

const routes: Routes = [
  { 
    path: '', 
    component: PerfilComponent 
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'cambiar-contrasena',
    component: CambiarContrasenaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
