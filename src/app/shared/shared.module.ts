import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from './angularMaterials/angularMaterials.module';
import { Error403Component } from './components/error403/error403.component';
import { Error404Component } from './components/error404/error404.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialsModule
  ],
  declarations: [
    Error403Component,
    Error404Component,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    Error403Component, Error404Component, HeaderComponent, FooterComponent, AngularMaterialsModule, CommonModule
  ]
})
export class SharedModule { }
