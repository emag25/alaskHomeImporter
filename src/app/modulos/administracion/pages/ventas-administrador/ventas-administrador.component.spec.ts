import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasAdministradorComponent } from './ventas-administrador.component';

describe('VentasAdministradorComponent', () => {
  let component: VentasAdministradorComponent;
  let fixture: ComponentFixture<VentasAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
