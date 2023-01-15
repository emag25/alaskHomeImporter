import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuarioComponent } from './components/registroUsuario/registroUsuario.component';
import { UsuariosModule } from '../modulos/usuarios/usuarios.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsuariosModule
  ],
  declarations: [
    LoginComponent,
    RegistroUsuarioComponent
  ]
})
export class AutenticacionModule { }
