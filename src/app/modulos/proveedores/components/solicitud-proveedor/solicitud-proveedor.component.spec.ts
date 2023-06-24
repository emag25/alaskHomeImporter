
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudProveedorComponent } from './solicitud-proveedor.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataProvinciasService } from '../../services/dataProvincias.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogExitoComponent } from '../dialogExito/dialogExito.component';
import { DataSolicitudProveedorService } from '../../services/dataSolicitudProveedor.service';
import { SolicitudProveedor } from '../../models/solicitudProveedor';
import { AngularMaterialsModule } from 'src/app/shared/angularMaterials/angularMaterials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SolicitudProveedorComponent', () => {
  let component: SolicitudProveedorComponent;
  let fixture: ComponentFixture<SolicitudProveedorComponent>;
  let mockDialog: MatDialog;
  let mockDialogRef: MatDialogRef<SolicitudProveedorComponent>;
  let mockDataProvincias: DataProvinciasService;
  let mockDataSolicitudProveedor: DataSolicitudProveedorService;


  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDataProvincias = jasmine.createSpyObj('DataProvinciasService', ['getProvincias']);
    mockDataSolicitudProveedor = jasmine.createSpyObj('DataSolicitudProveedorService', ['setSolicitudProveedor']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularMaterialsModule, BrowserAnimationsModule],
      declarations: [SolicitudProveedorComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: DataProvinciasService, useValue: mockDataProvincias },
        { provide: DataSolicitudProveedorService, useValue: mockDataSolicitudProveedor }
      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('El componente deberia crearse.', () => {
    expect(component).toBeTruthy();
  });



  it('El componente deberia inicializar el formulario de la solicitud.', () => {
    expect(component.formSolicitud).toBeInstanceOf(FormGroup);
    expect(component.formSolicitud.controls['ruc']).toBeDefined();
    expect(component.formSolicitud.controls['nombre']).toBeDefined();
    expect(component.formSolicitud.controls['email']).toBeDefined();
    expect(component.formSolicitud.controls['telefono']).toBeDefined();
    expect(component.formSolicitud.controls['provincia']).toBeDefined();
  });



  // Prueba de aceptacion:
  // Escenario: Los datos del formulario son validos.
  // El boton de enviar solicitud deberia estar habilitado y al hacer click en el, se deberia ejecutar el metodo onSubmit().
  // Escenario: Los datos del formulario son validos.
  // El boton de enviar solicitud deberia estar deshabilitado y al hacer click en el, no se deberia ejecutar el metodo onSubmit().
  it('El boton "btnEnviar" solo se habilita si el formulario es valido.', () => {

    spyOn(component, 'onSubmit');
    const button = fixture.nativeElement.querySelector('.btnEnviar');

    component.formSolicitud.setValue({
      ruc: '1234567890123',
      nombre: 'John Doe',
      email: 'j',
      telefono: '1234567890',
      provincia: 'Provincia Ejemplo'
    });

    if (component.formSolicitud.valid)
      expect(button.disabled).toBeFalsy();
    else
      expect(button.disabled).toBeTruthy();

    button.click();

    if (component.formSolicitud.valid)
      expect(component.onSubmit).toHaveBeenCalled();
    else
      expect(component.onSubmit).not.toHaveBeenCalled();

  });




  // Prueba de integracion:
  // Se comprueba la interaccion entre el componente solicitud-proveedor-component,el servicio DataSolicitudProveedorService y el componente DialogExitoComponent.
  it('El componente deberia usar el servicio DataSolicitudProveedorService y el componente DialogExitoComponent.', () => {
    
    const mockSolicitudProveedor = new SolicitudProveedor(
      11,
      '1234567890123', 
      'John Doe', 
      'johndoe@example.com', 
      '1234567890', 
      'Provincia Ejemplo',
      'Por revisar', 
      new Date() 
    );

    component.formSolicitud.setValue({
      ruc: '1234567890123',
      nombre: 'John Doe',
      email: 'johndoe@example.com',
      telefono: '1234567890',
      provincia: 'Provincia Ejemplo'
    });

    component.onSubmit();

    expect(mockDataSolicitudProveedor.setSolicitudProveedor).toHaveBeenCalledWith(mockSolicitudProveedor);
    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockDialog.open).toHaveBeenCalledWith(DialogExitoComponent);
    
  });


  // Prueba de rendimiento:
  // Se comprueba que el metodo random() genere un numero aleatorio entre 1 y 1000 en menos de 1 segundo.
  it('El metodo random() deberia generar un numero aleatorio entre 1 y 1000 en menos de 1 segundo.', () => {

    const start = performance.now();
    component.random(1, 1000);
    const end = performance.now();
    expect(end - start).toBeLessThan(1000);

  });


  // Prueba de aceptacion:
  // Escenario: El usuario hace click en el boton "btnCancelar".
  // El componente DialogRef deberia cerrarse.
  it('El boton "btnCancelar" deberia cerrar el componente.', () => {
      
    spyOn(component, 'cancelar');
    const button = fixture.nativeElement.querySelector('.btnCancelar');
    button.click();
    expect(component.cancelar).toHaveBeenCalled();
  
  });

});