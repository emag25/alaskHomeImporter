import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuarioComponent } from './components/registroUsuario/registroUsuario.component';
import { UsuariosModule } from 'src/app/modulos/usuarios/usuarios.module';
import { SharedModule } from 'src/app/shared/shared.module';

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
