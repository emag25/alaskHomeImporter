import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresAdministradorComponent } from './proveedores-administrador.component';

describe('ProveedoresAdministradorComponent', () => {
  let component: ProveedoresAdministradorComponent;
  let fixture: ComponentFixture<ProveedoresAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
