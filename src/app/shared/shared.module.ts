import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from './angularMaterials/angularMaterials.module';
import { Error403Component } from './components/error403/error403.component';
import { Error404Component } from './components/error404/error404.component';
import { DialogErrorComponent } from './components/dialogError/dialogError.component';
import { DialogExitoComponent } from './components/dialogExito/dialogExito.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialsModule
  ],
  declarations: [
    Error403Component,
    Error404Component,
    DialogErrorComponent,
    DialogExitoComponent
  ],
  exports: [
    Error403Component, Error404Component, AngularMaterialsModule, CommonModule, DialogErrorComponent, DialogExitoComponent
  ]
})
export class SharedModule { }
