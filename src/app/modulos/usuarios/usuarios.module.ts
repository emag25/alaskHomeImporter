import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CambiarContrasenaComponent } from './pages/cambiarContrasena/cambiarContrasena.component';
import { AdministracionModule } from '../administracion/administracion.module';


@NgModule({
  declarations: [
    PerfilComponent,
    CambiarContrasenaComponent

  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    AdministracionModule,
    MatFormFieldModule,
    MatSelectModule

  ]
})
export class UsuariosModule { }
